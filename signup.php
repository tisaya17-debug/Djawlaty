<?php
include("config.php");

$fullname = $_POST['fullname'];
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirm = $_POST['confirm_password'];
$role = $_POST['role'];
$field = $_POST['field'];

// 1. check password match
if($password != $confirm){
    die("Passwords do not match");
}

// 2. insert into database
$sql = "INSERT INTO users 
(fullname, username, email, password, role, field)
VALUES 
('$fullname','$username','$email','$password','$role','$field')";

$result = mysqli_query($conn,$sql);

if($result){
    echo "Account created successfully";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>