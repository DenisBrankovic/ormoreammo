<?php
	
	if(isset($_POST["submitBtn"])){
		 $name = $_POST["name"];
		 $subject = $_POST["subject"]; 
		 $mailFrom = $_POST["email"];
		 $message = $_POST["message"];
		 
		 $mailTo = "ormoreammo@gmail.com";
		 $headers = "ormoreammo ".$mailFrom; 
		 $txt = "You have received an e-mail from ".$name.".\n\n".$message; 
		 
		 mail($mailTo, $subject, $txt, $headers);
		 header("Location: confirmation.html"); 
	 }