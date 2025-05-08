<?php

// 1.  Grab data -----------------------------------------------------
$dataFile = $_SERVER['DOCUMENT_ROOT'] . '/childArtMagazineData.json';
$issues   = json_decode(file_get_contents($dataFile), true) ?: [];

// 2.  Helper to locate cover image ---------------------------------
function findCover(string $link): ?string
{
    // Strip query string & trailing slash
    $link   = preg_replace('#[/?]$#', '', $link);
    $base   = basename($link);                 // e.g. AI&Art   /  ChildArt_Q3_2018
    $base   = preg_replace('#\.pdf$#i', '', $base);

    // Folder that must contain the cover.<ext> file
    $folder = '/resource/flipbooks/' . $base;

    foreach (['webp', 'jpg', 'jpeg', 'png'] as $ext) {
        $try = $folder . '/cover.' . $ext;
        if (file_exists($_SERVER['DOCUMENT_ROOT'] . $try)) {
            return $try; // first hit wins
        }
    }
    return null;
}
function findPdf(string $link): ?string
{
  $link = preg_replace('#[/?]$#', '', $link);
  $base = basename($link); // e.g. GrowingEmpathy
  $dirPath = $_SERVER['DOCUMENT_ROOT'] . "/resource/flipbooks/{$base}";

  if (!is_dir($dirPath)) {
    return null;
  }

  foreach (glob($dirPath . '/*.pdf') as $pdfFile) {
    $relative = str_replace($_SERVER['DOCUMENT_ROOT'], '', $pdfFile);
    return $relative;
  }

  return null;
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
	<head>
	<title>ChildArt Magazine</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="description" content="ChildArt Magazine: a captivating quarterly magazine designed and written expressly for 8- to 12-year-old children to promote and nourish creativity and critical thinking." />
		<link rel="Shortcut Icon" type="image/png" href="../favicon.png" />
		<link href="css/style.css" rel="stylesheet" type="text/css" />
		<link href="css/prettyPhoto.css" rel="stylesheet" type="text/css" />
		<link href="css/ddsmoothmenu.css" rel="stylesheet" type="text/css" />
		<!-- JQUERY Library -->
		<script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
		<script type="text/javascript" src="js/fadeinout.js"></script>
		<script type="text/javascript" src="js/jquery.prettyPhoto.js"></script>
		<script type="text/javascript" src="js/ddsmoothmenu.js">
			/***********************************************
			 * Smooth Navigational Menu- (c) Dynamic Drive DHTML code library (www.dynamicdrive.com)
			 * This notice MUST stay intact for legal use
			 * Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
			 ***********************************************/
		</script>
		<!-- Pretty Photo Lightbox -->
		<script type="text/javascript" charset="utf-8">
			$(document).ready(function() {
				$("a[rel^='prettyPhoto']").prettyPhoto();
			});
		</script>
		<!-- Drop Down Menu -->
		<script type="text/javascript">
			ddsmoothmenu.init({
				mainmenuid: "smoothmenu1", //menu DIV id
				orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
				classname: 'ddsmoothmenu', //class added to menu's outer DIV
				//customtheme: ["#1c5a80", "#18374a"],
				contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
			})
		</script>
		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-39428957-1']);
			_gaq.push(['_setDomainName', 'icaf.org']);
			_gaq.push(['_setAllowLinker', true]);
			_gaq.push(['_trackPageview']);
			(function() {
				var ga = document.createElement('script');
				ga.type = 'text/javascript';
				ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ga, s);
			})();
		</script>
		<style>
			#contents             { float: unset; }
			#childartthemes       { font-weight:bold; color:green; }
			#childartthemes span  { font-weight:normal; color:black; }
			.magazine             { margin-bottom:2rem; }
			.magazine__cover      { text-align:center; margin-top:.5rem; }
			.magazine__cover img  { width:50%; height:auto; }
		</style>
	</head>
	<body>
	<div id="pagecontainer" style="position:relative">
		<div id="header">
			<!-- logo -->
			<div id="logo"><a href="/"><img src="images/international-child-art-foundation-logo-160x64.png" alt="International Child Art Foundation logo" /></a></div>
		</div> <!-- /header -->
		<div class="clear"></div>
		<div id="page"> <!-- Open Page -->
			<div id="breadcrumb">
				<ul>
					<li><a href="/">Home</a> | </li>
				</ul>
			</div>
			<a href="top"></a>
			<div id="pagetitle">
				<h1><span class="green">ChildArt Magazine</span></h1>
			</div>
			<div class="clear"></div>
			<div class="sidebaropts"><br />
			</div>
		</div>


		<div id="contents" class="twocolumn">
			<div id="childartthemes">

				<?php
					foreach ($issues as $issue) {
						$isPdf = !empty($issue['isPdf']);
						$cover = findCover($issue['link']);
						if (!$cover) {
							continue;
						}

						// Generate href
						if ($isPdf) {
							$href = findPdf($issue['link']);
							if (!$href) {
								continue; // skip if no PDF found
							}
						} else {
							$href = (strpos($issue['link'], 'http') === 0)
							? $issue['link']
							: '/' . ltrim($issue['link'], '/');
						
						// If it's a local path starting with /resource/flipbooks/, strip that prefix for display
						if (strpos($href, '/resource/flipbooks/') === 0) {
							$href = substr($href, strlen('/resource/flipbooks/'));
							$href = '/' . ltrim($href, '/'); // ensure it still starts with slash
							$href = rtrim($href, '/') . '/'; // ensure it ends with a slash
						}
					}
					?>
						<div class="magazine">
							<span class="exclude"><?= htmlspecialchars($issue['period']) ?>:</span>
							<?= htmlspecialchars($issue['name']) ?><br />
							<?= htmlspecialchars($issue['volume']) ?>
							<div class="magazine__cover">
								<a href="<?= htmlspecialchars($href) ?>" target="_blank">
									<img src="<?= htmlspecialchars($cover) ?>" alt="<?= htmlspecialchars($issue['name']) ?>" />
								</a>
							</div>
						</div>
					<?php
				}
				?>
			</div>
			<div style="float:left">
				<br />
				<script type="text/javascript" src="http://platform.linkedin.com/in.js"></script>
				<script type="in/recommendproduct" data-company="423304" data-product="44135" data-counter="right"></script>
				<p align="left"><strong><a href="#top">Back to top</a></strong></p>
			</div>
		</div>

		</div>
	</body>
</html>
