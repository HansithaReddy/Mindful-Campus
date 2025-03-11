<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mindfulcampus";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $feedback = $_POST['feedback'];
    $permission = $_POST['permission'];

    $sql = "INSERT INTO feedback (feedback_text, permission) VALUES ('$feedback', '$permission')";

    if ($conn->query($sql) === TRUE) {
        echo "Your feedback has been successfully submitted !";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
