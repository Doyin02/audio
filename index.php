<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/style.css">
    <title>PDF TO AUDIO CONVERTER</title>
</head>
<body>
    <div class="wrapper">
        <header>Pdf To Audio</header>
        <form action="#">
            <div class="row">
                <label>Pdf Data Extracted</label>
                <textarea readonly><?php echo $_SESSION['content']; ?></textarea>
            </div>
            <div class="row">
                <label>Select Ai Voice</label>
                <div class="outer">
                    <select></select>
                </div>
            </div>
            <button>Convert to Audio</button>
        </form>
    </div>

<?php ?>
    <script src="script/script.js"></script>
</body>
</html>