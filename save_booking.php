<?php
session_start();
include("config.php"); 

// 1. التحقق من تسجيل الدخول
if (!isset($_SESSION['user_id'])) {
    echo "<script>alert('Veuillez vous connecter d\'abord !'); window.location.href='login.html';</script>";
    exit();
}

// 2. استقبال البيانات
if (isset($_GET['airline'])) {
    $user_id = $_SESSION['user_id'];
    $airline = mysqli_real_escape_string($conn, $_GET['airline']);
    $flight_no = mysqli_real_escape_string($conn, $_GET['flight_no']);
    $from = mysqli_real_escape_string($conn, $_GET['from']);
    $to = mysqli_real_escape_string($conn, $_GET['to']);
    $price = mysqli_real_escape_string($conn, $_GET['price']);
    
    // ملاحظة: لا نحتاج لاستقبال booking_date من الرابط لأن قاعدة البيانات تسجله تلقائياً
    // لكن سنضعه في الاستعلام للتأكد

    // 3. كود الإدخال
    $sql = "INSERT INTO booking_flights (user_id, airline_name, flight_number, departure_city, arrival_city, price, booking_date) 
            VALUES ('$user_id', '$airline', '$flight_no', '$from', '$to', '$price', NOW())";

    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('Réservation réussie !'); window.location.href='flights.html';</script>";
    } else {
        // إذا ظهر خطأ هنا، انسخيه لي لأعرف المشكلة
        echo "Erreur SQL : " . mysqli_error($conn);
    }
} else {
    echo "Aucune donnée reçue.";
}

mysqli_close($conn);
?>