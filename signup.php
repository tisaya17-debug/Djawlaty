<?php
include("config.php");

// تأمين المدخلات
$fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
$username = mysqli_real_escape_string($conn, $_POST['username']);
$email    = mysqli_real_escape_string($conn, $_POST['email']);
$password = $_POST['password'];
$confirm  = $_POST['confirm_password'];
$role     = mysqli_real_escape_string($conn, $_POST['role']);
$field    = mysqli_real_escape_string($conn, $_POST['field']);

// 1. التأكد من تطابق كلمة السر
if($password != $confirm){
    echo "<script>alert('Les mots de passe ne correspondent pas'); window.history.back();</script>";
    exit();
}

// 2. إدخال البيانات في قاعدة البيانات
$sql = "INSERT INTO users (fullname, username, email, password, role, field)
        VALUES ('$fullname', '$username', '$email', '$password', '$role', '$field')";

if(mysqli_query($conn, $sql)){
    // توجيه المستخدم لصفحة تسجيل الدخول بعد النجاح
    echo "<script>alert('Compte créé avec succès ! Connectez-vous.'); window.location='login.html';</script>";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>