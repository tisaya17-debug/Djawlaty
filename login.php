<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="login.css">
<title>Login</title>
</head>

<body>

<?php
session_start();

/* connexion database */
$link = mysqli_connect(
"sql305.byethost24.com",
"b24_38990178",
"azerty",
"b24_38990178_daw"
);

if(!$link){
die("Connection failed");
}

/* logout */
if(isset($_GET['logout'])){
session_destroy();
header("Location: login.php");
exit();
}

/* LOGIN */
if($_SERVER['REQUEST_METHOD']=="POST"){

$email = $_POST['email'];
$password = $_POST['password'];

$query = "SELECT * FROM clientinfos WHERE email='$email' AND passw='$password'";
$result = mysqli_query($link,$query);

if(mysqli_num_rows($result)>0){

$row = mysqli_fetch_assoc($result);

/* session */
$_SESSION['id_clt'] = $row['id'];
$_SESSION['name'] = $row['firstname'];
$_SESSION['lastname'] = $row['lastname'];
$_SESSION['email'] = $row['email'];

/* message */
echo "<h2>Welcome ".$row['firstname']." ".$row['lastname']."</h2>";

/* TABLEAU CLIENT */
echo "
<table border='1' cellpadding='10'>
<tr>
<th>ID</th>
<th>First Name</th>
<th>Last Name</th>
<th>Email</th>
</tr>

<tr>
<td>".$row['id']."</td>
<td>".$row['firstname']."</td>
<td>".$row['lastname']."</td>
<td>".$row['email']."</td>
</tr>
</table>
";

/* links */
echo "<br><a href='index.html'>Home page</a>";
echo "<br><a href='?logout=true'>Logout</a>";

}

else{
echo "<h3>Email or password incorrect</h3>";
}

}

/* FORM LOGIN */
else{

echo '

<form method="POST">

<label>Email</label>
<input type="email" name="email" required><br><br>

<label>Password</label>
<input type="password" name="password" required><br><br>

<input type="submit" value="Login">

<br><br>
<a href="inscription.html">Sign up</a>

</form>

';

}

mysqli_close($link);

?>

</body>
</html>