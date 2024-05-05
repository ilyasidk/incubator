<?php
$servername = "localhost";
$username = "guest;
$password = "123";
$dbname = "database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Обработка формы регистрации
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Хеширование пароля
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

  // Вставка данных в базу данных
  $sql = "INSERT INTO users (email, password) VALUES ('$email', '$hashed_password')";

  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();
?>
