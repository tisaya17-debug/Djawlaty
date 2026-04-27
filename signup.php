<?php
include("config.php");

ini_set('display_errors', 1);
error_reporting(E_ALL);

$fullname = trim($_POST['fullname'] ?? '');
$username = trim($_POST['username'] ?? '');
$email    = trim($_POST['email']    ?? '');
$password =      $_POST['password'] ?? '';
$confirm  =      $_POST['confirm_password'] ?? '';
$role     = trim($_POST['role']     ?? '');
$field    = trim($_POST['field']    ?? '');

if (!$fullname || !$username || !$email || !$password || !$confirm || !$role) {
    echo "<script>alert('Veuillez remplir tous les champs.'); window.history.back();</script>";
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('Adresse email invalide.'); window.history.back();</script>";
    exit();
}

if ($password !== $confirm) {
    echo "<script>alert('Les mots de passe ne correspondent pas.'); window.history.back();</script>";
    exit();
}

if (strlen($password) < 8) {
    echo "<script>alert('Le mot de passe doit contenir au moins 8 caractères.'); window.history.back();</script>";
    exit();
}

if (!in_array($role, ['client', 'provider'])) {
    echo "<script>alert('Rôle invalide.'); window.history.back();</script>";
    exit();
}

if ($role === 'provider' && empty($field)) {
    echo "<script>alert('Veuillez sélectionner votre domaine.'); window.history.back();</script>";
    exit();
}

$checkStmt = mysqli_prepare($conn, "SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1");
mysqli_stmt_bind_param($checkStmt, "ss", $email, $username);
mysqli_stmt_execute($checkStmt);
mysqli_stmt_store_result($checkStmt);

if (mysqli_stmt_num_rows($checkStmt) > 0) {
    echo "<script>alert('Email ou nom d\\'utilisateur déjà utilisé.'); window.history.back();</script>";
    mysqli_stmt_close($checkStmt);
    exit();
}
mysqli_stmt_close($checkStmt);

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = mysqli_prepare($conn, "INSERT INTO users (fullname, username, email, password, role, field) VALUES (?, ?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, "ssssss", $fullname, $username, $email, $hashedPassword, $role, $field);

if (mysqli_stmt_execute($stmt)) {
    echo "<script>alert('Compte créé avec succès ! Connectez-vous.'); window.location='login.html';</script>";
} else {
    $error = mysqli_stmt_error($stmt);
    echo "<script>alert('Erreur: " . addslashes($error) . "'); window.history.back();</script>";
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>