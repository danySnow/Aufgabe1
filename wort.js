function go(){
	
	var ratsel = document.getElementById('i').value;
	var words = [];
	var zeichen = [];
	
	words[0] = '';
	
	for(x in ratsel){
		
		if(isLetter(ratsel[x])){
			words[words.length-1] += ratsel[x];
			
		}else if(ratsel[x] == ' '){
			words[words.length] = '';
		}else{
			if(isValid(ratsel[x])){
				words[words.length-1] += ratsel[x];
			}else{
				zeichen[words.length] = ratsel[x];
			}
		}
		
	}
	console.log(words, zeichen);
	
	var unsolvedWords = [], solvedWords = [];
	
	for(let x = 0; x < words.length; x++){
		
		if(x < words.length/2){
			unsolvedWords[x] = words[x];
			
		}else{
			solvedWords[x - words.length/2] = words[x];
			
		}
		
		
		
	}
	
	
	loeseRatsel(unsolvedWords, solvedWords, zeichen);
	
	
}

function loeseRatsel(uW, sW, zeichen){
	
	var solvedWordsLength = [];
	var unsolvedWordsLength = [];
	
	for(x in uW){
		solvedWordsLength[uW[x].length] = [];
		unsolvedWordsLength[uW[x].length] = [];
	}
	
	for(x in sW){
		solvedWordsLength[sW[x].length][solvedWordsLength[sW[x].length].length] = sW[x];
	}
	
	for(y in uW){
		unsolvedWordsLength[uW[y].length][unsolvedWordsLength[uW[y].length].length] = uW[y];
		
	}
	
	console.log(solvedWordsLength, unsolvedWordsLength);

	var loops = 0;
	for(x in solvedWordsLength){
		if(solvedWordsLength[x].length > loops){
			loops = solvedWordsLength[x].length;
		}
	}
	
	
	
	
	
	
	var solutionWords = [];
	
	while(loops > 0){
		for(x in solvedWordsLength){
			for(z in unsolvedWordsLength[x]){
				
				// getting the letter of the unsolved Word
				let num = 0;
				while(unsolvedWordsLength[x][z][num] == '_'){
					num++;
					if(num >= unsolvedWordsLength[x][z].length){
						num = 0;
						break;
					}
				}
				
				
				
				var solutions = [];
				for(y in solvedWordsLength[x]){	
					if(unsolvedWordsLength[x][z][num] == solvedWordsLength[x][y][num]){
						solutions[solutions.length] = y;
					}
				}
				
				
				if(solutions.length == 1){
					for(n in uW){
						if(uW[n] == unsolvedWordsLength[x][z]){
							solutionWords[n] = solvedWordsLength[x][solutions[0]];
						}
					}
					unsolvedWordsLength[x].splice(z, 1);
					solvedWordsLength[x].splice(solutions[0], 1);
					
				}else if(solutions.length == 2){
					if(solvedWordsLength[x][solutions[0]] == solvedWordsLength[x][solutions[1]]){
						for(n in uW){
							if(uW[n] == unsolvedWordsLength[x][z]){
								solutionWords[n] = solvedWordsLength[x][solutions[0]];
							}
						}
						solvedWordsLength[x].splice(solutions[0], 1);
						unsolvedWordsLength[x].splice(z, 1);
						
					}
				}else if(solutions.length > 2){
					
				}
			}
			
		}
		loops--;
	}
	for(x in uW){
		for(y in unsolvedWordsLength){
			if(uW[x] == unsolvedWordsLength[y]){
				solutionWords[x] = solvedWordsLength[y][0];
			}
		}
	}
	
	console.log(unsolvedWordsLength, solvedWordsLength);
	console.log(solutionWords);
	
	var EndString = '';
	for(x in solutionWords){
		if(!isValid(zeichen[x])){
			EndString += zeichen[x];
		}
		
		EndString += ' ';
		EndString += solutionWords[x];
	}
	console.log(EndString);
	
}








function isLetter(str) {
	try{
		if(str.match(/[a-z]/i)){
			return true;
		}else{
			return false;
		}
	}catch{
		return false;
	}
}

function isValid(str){
	return !/[~`!#$%\^&*+=\-\[\]\\';,./{}|\\":<>\?]/g.test(str);
}


















