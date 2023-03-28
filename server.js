const http = require("http"); //Burada binamızın oturacağı zemini söylüyoruz.
const express = require("express"); // Ve burada ise zemine dikeceğimiz binayı tanımlıyoruz(express bu binayı tamamen hazır bir şekilde bize veriyor).
const app = express(); // Bu tanımladığımız binayı artık çalıştırmaya başlıyoruz.
const server = http.createServer(app); // Çalıştırdığımız ve hazır olan binamızı http.create server ile zemine oturdup ikisini birleştiriyoruz ve böylece serverimiz full halde hazır oluyor.
const io = require("socket.io")(server); // Şimdi ise bu örnekte chat app yapacağımız için binamızın tepesine anten takıyoruz. Bu antenin ismi io(input-output) Socket.io modülü

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", { root: __dirname });
});

io.on("connection", function (socket) {
  // Burada input-output kısmına connection durumu olduğunda bir bir kanal açıyoruz her kullanıcı için.
  console.log("a user connected"); // Console bir kişi geldiğini yazdırıyoruz.
  socket.on("chat message", function (msg) {
    // Eğer açık kanaldan birisi chat message komutu ile bir message yollar ise bunu yakalıyoruz.
    io.emit("chat message", msg); // Yakaladığmız bu mesajı bize bağlı olan bütün açık kanallara emit(yayılma) ediyoruz.
  });
  socket.on("disconnect", function () {
    // Eğer açık kanaldan birisi çıkar ise bunu yakalıyoruz.
    console.log("user disconnected"); // Birisinin çıktığını söylüyoruz. (Kendisi otomatik olarak açık kanalı o kişi için kapatacaktır.)
  });
});

const port = 8000;
server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
