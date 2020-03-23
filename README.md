# dictionary
1. Installation <br/>
    To install this tool run npm install in this directory. <br/>
    Use npm link.<br/>
    Change Shebang line according to node installation int ./dict.js.<br/>
   
2. Commands <br/>
 	=> Word Definitions<br/>
	  Display definitions of a word. <br/>
	  ./dict defn <word><br/>

	=> Word Synonyms<br/>
	  Display synonyms of a word. <br/>
	  ./dict syn <word><br/>
    
	=> Word Antonyms<br/>
	  Display antonyms of a word<br/>
	  . /dict ant <word><br/>

 	=> Word Examples<br/>
	  Display examples of a word<br/>
	  ./dict ex <word><br/>

 	=> Word Full Dict<br/>
	  Display all above details for a word<br/>
	  ./dict <word> or ./dict dict <word><br/>

	=> Word Game<br/>
	  ./dict play<br/>
	  The program displays adefinition, a synonym or an antonym and ask the user to guess the word.<br/>

			If correct word is entered, program  tells that the word is correct.
			*Other(not displayed) Synonyms of the word are accepted as correct answer.
	  
    		If incorrect word is entered, program asks for
			1. try again
			   Lets the user to enter word again.

		  	2. hint
			   Display a hint in form of 
			   
            1. Display the word randomly jumbled (cat => atc, tac, tca)
            2. Display another definition of the word
            3. Display another antonym of the word
            4. Display another synonym of the word
			   
			and let the user to enter word again.
			If no more synonyms are available, tells the user "No more hints are available".
			3. quit
		           Display the word, its full dict, and quits.
   
   To run these commands properly set the node location correctly in shebang line.
   Otherwise you can always try them with node ./dict command word.
   