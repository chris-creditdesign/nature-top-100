---

# Top 100 cited papers

Infographic for @naturenews

### To amend by hand

Ofarrell_1975 = OFarrell_1975
Scatchard_1949 = Scratchard_1949
Folstein_1975 = Fulstein_1975
Altschul_1990 = Atlschul_1990
Altschul_1997 = Atlschul_1997
Kaplan_1958 = Kaplan_Meier_1958

Find and replace Total: to Total


### Excel formulas to clean up entries

Get lead author first name (presuming it is the first word and followed by a comma):
	
	=PROPER(LEFT(Sheet1!A2,SEARCH(",",Sheet1!A2)-1))

Capitalise the first letter of each work in author list:

	=PROPER(Sheet1!A2)

Capitalise the first letter the title

	=UPPER(LEFT(Sheet1!B2,1))&LOWER(RIGHT(Sheet1!B2,LEN(Sheet1!B2)-1))


### Convert CSV to JSON

[www.convertcsv.com/csv-to-json.htm](http://www.convertcsv.com/csv-to-json.htm)

### Convert a large amount of Excel .xls files to .csv

First use Automator app to batch conver from xls to xlsx 

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

<!-- Then remove the newly added "_" (You'll have to delete the existing files by hand, sorry).
	
	for file in *; 
	do 
		mv "${file}" "${file/_/}";
	done -->

Append file name, excluding file extension as a value for the first column into every line of the file

	for file in *; 
	do
		blap="${file%.csv},";
		sed -e "s/^/$blap/" $file > temp && mv temp "${file}";
	done

<!-- Add a header row of 'year, cites' to each file. From [superuser thread](http://superuser.com/questions/246837/how-do-i-add-text-to-the-beginning-of-a-file-in-bash).
	
	for file in *; do echo 'year, cites' | cat - "${file}" > temp && mv  temp "${file}"; done -->

Combine all csvs into one new file to rule them all:

	cat * > combined.csv

Add a header row of 'lead_author, year, cites' to this new file

	echo 'lead_author,year,cites' | cat - combined.csv > temp && mv temp combined.csv;






