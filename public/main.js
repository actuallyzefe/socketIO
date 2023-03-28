const socket = io(); // Kullanıcı tarafında da bağlantı nesnemizi oluşturuyoruz.

$(function () {
  $("form").submit(function (e) {
    /* Formu göndermek için alıyor. */ e.preventDefault(); // Sayfanın yenilenmesini engelliyor.
    socket.emit(
      "chat message",
      $("#m").val()
    ); /* Yazdığımız mesajı alıyor ve socket antenine chat message kodu ile dışarı yayınlıyor. */
    $("#m").val(""); // Ardından ise bu mesaj kısmını gönderdiği için geri boş hale getiriyor.
    return false;
  });
  socket.on("chat message", function (msg) {
    /* yukarıda emit diyerek mesajı yayınladığımız gibi eğer bana chat message başlığı ile bir mesaj gelirse onu ekrana yazdır diyoruz. */ $(
      "#messages"
    ).append(
      $("<li>").text(msg)
    ); /* gelen mesajı message id'sine sahip elemente text olarak yazdır diyoruz. */
  });
});
