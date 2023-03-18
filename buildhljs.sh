if [ ! -d "highlight.js" ]; then
  git clone https://github.com/highlightjs/highlight.js.git
fi
cd highlight.js
npm install
node tools/build.js python ruby bash css xml kotlin markdown sql typescript c diff json plaintext ruby shell csharp go java lua php python rust cpp javascript cmake yaml ini properties brainfuck clojure dockerfile dos groovy gradle powershell
cp build/highlight.min.js ../public