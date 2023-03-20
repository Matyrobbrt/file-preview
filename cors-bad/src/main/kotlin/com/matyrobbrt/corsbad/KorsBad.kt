@file:JvmName("KorsBad")
package com.matyrobbrt.corsbad

import io.javalin.Javalin
import io.javalin.http.util.NaiveRateLimit
import org.eclipse.jetty.http.HttpStatus
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse.BodyHandlers
import java.time.Duration
import java.time.temporal.ChronoUnit
import java.util.concurrent.TimeUnit

fun main() {
    val httpClient = HttpClient.newBuilder()
        .connectTimeout(Duration.of(15, ChronoUnit.SECONDS))
        .followRedirects(HttpClient.Redirect.NORMAL)
        .build()

    val allowedHeaders = setOf("Accept")

    Javalin.create()
        .get("/") { ctx ->
            NaiveRateLimit.requestPerTimeUnit(ctx, 20, TimeUnit.MINUTES)

            val urlS = ctx.queryParam("url")
            if (urlS == null) {
                ctx.status(HttpStatus.BAD_REQUEST_400)
                return@get
            }
            val url = URI.create(urlS)

            try {
                val response = httpClient.send(HttpRequest.newBuilder(url)
                    .GET()
                    .transferOnlyHeaders(ctx.headerMap(), allowedHeaders)
                    .header("User-Agent", if (url.host.equals("cdn.discordapp.com")) "DiscordBot" else "CORS Proxy")
                    .build(), BodyHandlers.ofByteArray())

                ctx.status(response.statusCode())
                    .result(response.body())
                    .header("Access-Control-Allow-Origin", "*")
            } catch (ex: Exception) {
                ex.printStackTrace()
            }
        }
        .start(System.getenv("corsBadPort")?.toInt() ?: 9732 )
}

fun HttpRequest.Builder.transferOnlyHeaders(headers: Map<String, String>, allowedHeaders: Set<String>): HttpRequest.Builder {
    headers.forEach { (name, value) ->
        if (allowedHeaders.contains(name)) {
            header(name, value)
        }
    }
    return this
}