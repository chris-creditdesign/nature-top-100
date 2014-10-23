---

# Top 100 cited papers

Infographic for @naturenews


Extra entry!!!

Radloff, L. S.

Rank 52

========================

## Working process for coverting Google doc to array of objects.

Download the [Google spreadsheet](https://docs.google.com/spreadsheets/d/1VIP4q7gfBt9tIVNZb-ej2oLEhKFi7i8qGbPRSlhGJOU/edit?usp=sharing) as Microsoft Excel file (.xlsx).

In Excel remove all formatting.

Create a new sheet to contain the amended data.

Create links to authors, title, journal, volume, page, pub-year, doi, hyperlink and discipline cells.

Convert the volume, page, pub-year values to text as opposed to numbers.

	=TEXT(Sheet1!E2,"#")

In the first column, lead_author, combine the lead authors first name with the pub-year to allow cross referencing with the lifecycle data file names ie. "Lowry_1951".

	=CONCATENATE(PROPER(LEFT(Sheet1!B2,SEARCH(",",Sheet1!B2)-1)), "_", (Sheet1!G2))

### To amend by hand

The world is not a perfect place so you'll have to amend some by hand.

Replace all em dashes with <pre>&mdash;</pre> and en dashes <pre>&ndash;</pre>
Replace minus signs in page ranges with en dashes <pre>&ndash;</pre>

Replace quotation marks
"Mini-mental state": A practical method for grading cognitive state of patients for clinician.
&quot;Mini-mental state&quot;: A practical method for grading cognitive state of patients for clinician.

ö with &ouml;
’ with &#8217;
ä with &auml;
ü with &uuml;

=> "Sheldrick_1990" needs a comma
=> "Lee_1988" needs a comma
=> "Sanger_1977" needs a comma
=> "Kirkpatrick_1983" needs a comma.


=> Radloff, L. S. remove hidden character

Köhler_1975 = Kohler_1975
O’Regan_1991 = Oregan_1991
Yanisch-Perron_1985 = Yanischperron_1985
Brünger_1998 = Brunger_1998
Böyum_1968 = Boyum_1968
O’Farrell_1975  = OFarrell_1975
Altschul_1997 = Atlschul_1997
Altschul_1990 = Atlschul_1990
Scatchard_1949 = Scratchard_1949
Folstein_1975 = Fulstein_1975
Kaplan_1958 = Kaplan_Meier_1958
Blöchl_1994 = Blochl_1994
Bimboim_1979 = Birnboim_1979
riedewald_1972 = Friedewa_1972

The lower of the two Kresse_1996 = Kresse_1996_2

Save out as a csv file.

========================

## Convert a large amount of Excel .xls files to .csv

First use Automator app to batch convert from xls to xlsx 

Then use xlsx to csv converter [github.com/dilshod/xlsx2csv](http://github.com/dilshod/xlsx2csv)

Installation:
	
	sudo easy_install xlsx2csv

To convert multiple files:
	
	for f in *xlsx; 
		do xlsx2csv "$f" "${f%.xlsx}.csv"; 
	done

Then remove all those pesky excel files:
	
	rm *.xlsx

Remove the opening 'N_' from the filenames:
	
	for file in *; 
		do mv "${file}" "${file/N_/}";
	done

Remove '_Annual_Citation_Counts' from the filenames:
	
	for file in *; 
		do mv "${file}" "${file/_Annual_Citation_Counts/}";
	done

Remove leading spaces before numbers: 

	for file in *;
	do
		cat "${file}" | tr -d "[:blank:]" > temp && mv temp "${file}";
	done

Append file name, excluding file extension as a value for the first column into every line of the file

	for file in *; 
	do
		blap="${file%.csv},";
		sed -e "s/^/$blap/" $file > temp && mv temp "${file}";
	done

Combine all csvs into one new file to rule them all:

	cat * > combined.csv

Add a header row of 'lead_author, year, cites' to this new file

	echo 'lead_author,year,cites' | cat - combined.csv > temp && mv temp combined.csv;


Find and replace all instances of "Total": to "total".
and "total:" to "total".

========================

### Convert CSV to JSON

Use this tool to [www.convertcsv.com/csv-to-json.htm](http://www.convertcsv.com/csv-to-json.htm) convert your excel files to arrays of javascript objects.

========================

No lifecycel

Radloff_1977
Friedewald_1972

### Excel formulas to clean up entries

Get lead author first name (presuming it is the first word and followed by a comma):
	
	=PROPER(LEFT(Sheet1!A2,SEARCH(",",Sheet1!A2)-1))

Capitalise the first letter of each work in author list:

	=PROPER(Sheet1!A2)

Capitalise the first letter the title

	=UPPER(LEFT(Sheet1!B2,1))&LOWER(RIGHT(Sheet1!B2,LEN(Sheet1!B2)-1))


### Convert CSV to JSON

[www.convertcsv.com/csv-to-json.htm](http://www.convertcsv.com/csv-to-json.htm)








