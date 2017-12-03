// Berechnet die Entfernung zwischen zwei Punkten. uebergeben werden die Punkte in geogr. Länge und Breite
function distance(la,ba,le,be)
{
	f = 1 / 298.257223563;
	a = 6378.137 ;
	rho = Math.PI /180; 
	F = rho * (ba + be)*0.5;
	G = rho * (ba - be)*0.5;
	l = rho * (la - le)*0.5;
	S = Math.pow(Math.sin(G),2) * Math.pow(Math.cos(l),2) + Math.pow(Math.cos(F),2) * Math.pow(Math.sin(l),2);
	if(S==0) return 0;  // Punkte identisch
	C = Math.pow(Math.cos(G),2) * Math.pow(Math.cos(l),2) + Math.pow(Math.sin(F),2) * Math.pow(Math.sin(l),2);
	w = Math.atan(Math.sqrt(S/C));
	D = 2 * w *a;
	// Korrektur durch zwei Faktoren
	R = Math.sqrt(S*C) / w;
	H1 = (3*R-1)/(2*C);
	H2 = (3*R+1)/(2*S);

	 // Abstand in Metern:
	s = (D * (1+f*H1*Math.pow(Math.sin(F),2)*Math.pow(Math.cos(G),2) - f*H2*Math.pow(Math.cos(F),2)*Math.pow(Math.sin(G),2))) ;
	return s;
}

function loadXMLasyn(name, func)
{
	var xmlHttp = null;
	try 
	{
	    // Mozilla, Opera, Safari sowie Internet Explorer (ab v7)
	    xmlHttp = new XMLHttpRequest();
	} 
	catch(e) 
	{
    		try 
    		{
        		// MS Internet Explorer (ab v6)
        		xmlHttp  = new ActiveXObject("Microsoft.XMLHTTP");
    		} 
    		catch(e) 
    		{
        		try 
        		{
            			// MS Internet Explorer (ab v5)
            			xmlHttp  = new ActiveXObject("Msxml2.XMLHTTP");
        		} 
        		catch(e) 
        		{
 				alert(e.message); 
            			xmlHttp  = null;
		        }
		}
	}
	if (xmlHttp) 
	{
		xmlHttp.open('GET', 'beispiel.xml', true);
		xmlHttp.onreadystatechange = function () 
		{ 
			if (xmlHttp.readyState == 4) 
			{ 
				Ready(xmlhttp.responseXML.documentElement);
			} 
		};
    		xmlHttp.send(null);
    	}
}
 
function loadXMLsyn(name)
{
 	try 
 	{ 	//Internet Explorer
 		var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
 		xmlDoc.async=false;
 		xmlDoc.load(name);
 		return xmlDoc;
 	}
 	catch(e) 
 	{
 		try 
 		{ 	//Firefox, Mozilla, Opera, etc.
 			var xmlhttp = new XMLHttpRequest();
 			xmlhttp.open("GET", name, false);
 			xmlhttp.send(null);
 			return xmlhttp.responseXML.documentElement;
 		}
 		catch(e) 
 		{ 
 			alert(e.message); 
 			return; 
 		}
 	}
 }
