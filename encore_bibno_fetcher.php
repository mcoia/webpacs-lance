<!DOCTYPE html>
<html>

<head>
<title>Encore Bib Number Fetcher</title>
</head>

<body>
<?php
	$cluster = '6lanc';
	$cluster_recno = $_REQUEST['bibno'];
	$url = 'http://classic.searchmobius.org/search/z?' . $cluster . '+' . $cluster_recno;
	$innreach_record = file_get_contents($url);

	if (preg_match('/^b\d{7}$/', $cluster_recno)) {

		$doc = new DOMDocument();
		libxml_use_internal_errors(true);
		$doc->loadHTML($innreach_record);
		$finder = new DomXPath($doc);
		$classic_url = $doc->saveHTML($finder->query("//*[contains(@class, 'bibDisplayPermLink')]")->item(0));

		preg_match('/b\d{7}[0-9x]/', $classic_url, $innreach_recno);

		echo '<div class="innreach_recno">' . $innreach_recno[0] . '</div>';	
		
	}
?>

</body>

</html>
