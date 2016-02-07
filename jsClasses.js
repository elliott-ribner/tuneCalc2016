"use strict";
var _ = require('lodash');
const tomSizes = [ 18, 16, 15, 14, 13, 12, 10, 8 ];
const A = 1 / 1.72;


class DrumSet {
	constructor(drumSizesArray,brand,owner) {
		var drumObjectArray = [];
		_.each(drumSizesArray, function(drum) {
			drumObjectArray.push(new Drum(drum, owner));
		});
		this.drums = drumObjectArray;
		this.owner = owner;
		this.brand = brand;
		// location of smallest Tom in tom sizes array
		this.smallTom = _.indexOf( tomSizes, _.sortBy(this.drums, ['size'])[0].size);
		// location of biggest Tom in tom sizes array
		this.bigTom = _.indexOf( tomSizes, _.sortBy(this.drums, ['size']).reverse()[0].size);
		this.numberToms = this.drums.length;
		this.tomGap = this.smallTom - this.bigTom - this.numberToms + 1;
		this.createSemiToneArray();
		this.getRoot();
		this.setFrequencyIndictor();
		this.setHeads();
	}
	getRoot() {
		let rootsArray = [11,14,16,17,19,22,26,31];
		//maping index of bigTom value from tomSizes array to rootsArray
		//adjust with user pitch transpose setting
		this.root = rootsArray[this.bigTom] + this.owner.pitchTranspose;
	}
	createSemiToneArray() {
		var noteFreqs= [];
		const semiToneRatio = 1.0594631;
		var c1note = 32.7032;
		for (var i=0; i<60; i++) {
		  noteFreqs[i] = c1note;
		  c1note *= semiToneRatio;
		}
		this.noteFreqs = noteFreqs;
	}
	setFrequencyIndictor() {
		switch(this.numberToms){
        	case 1:
        		this.drums[0].semiToneIndex = this.root; 
        		break;
        	case 2:
        		if (this.tomGap <3) {
        			this.drums[0].semiToneIndex = this.root; 		// Perfect Fifth
        			this.drums[1].semiToneIndex = this.root + 7;
        		} else {
        			this.drums[0].semiToneIndex = this.root; 		// Octave
        			this.drums[1].semiToneIndex = this.root + 12;
        		}
        		break;
            case 3:
                if (this.tomGap < 2){		// Major Chord
	                this.drums[0].semiToneIndex = this.root; 
	                this.drums[1].semiToneIndex = this.root + 4;
	                this.drums[2].semiToneIndex = this.root + 7;
                } else if (this.tomGap === 2){ // Major Thirds
	                this.drums[0].semiToneIndex = this.root; 
	                this.drums[1].semiToneIndex = this.root + 4;
	                this.drums[2].semiToneIndex = this.root + 8;
                } else {
	                this.drums[0].semiToneIndex = this.root; 		// Perfect Fourths
	                this.drums[1].semiToneIndex = this.root + 5;
	                this.drums[2].semiToneIndex = this.root + 10;
                }
                break;
	        case 4:
	            if (this.tomGap < 2){		// Call to the Post
		            this.drums[0].semiToneIndex = this.root; 
		            this.drums[1].semiToneIndex = this.root + 5;
		            this.drums[2].semiToneIndex = this.root + 9;
		            this.drums[3].semiToneIndex = this.root + 12;
	            } else if (this.tomGap === 2){ // Major Thirds
		            this.drums[0].semiToneIndex = this.root; 
		            this.drums[1].semiToneIndex = this.root + 4;
		            this.drums[2].semiToneIndex = this.root + 8;
		            this.drums[3].semiToneIndex = this.root + 12;
	            } else {
		            this.drums[0].semiToneIndex = this.root; 		// Perfect Fourths
		            this.drums[1].semiToneIndex = this.root + 5;
		            this.drums[2].semiToneIndex = this.root + 10;
		            this.drums[3].semiToneIndex = this.root + 15;
	            }
	            break;
            case 5:
                if (this.tomGap < 2){		// Major Thirds
                    this.drums[0].semiToneIndex = this.root; 
                    this.drums[1].semiToneIndex = this.root + 4;
                    this.drums[2].semiToneIndex = this.root + 8;
                    this.drums[3].semiToneIndex = this.root + 12;
                    this.drums[4].semiToneIndex = this.root + 16;
                } else {
                    this.drums[0].semiToneIndex = this.root; 		// Perfect Fourths
                    this.drums[1].semiToneIndex = this.root + 5;
                    this.drums[2].semiToneIndex = this.root + 10;
                    this.drums[3].semiToneIndex = this.root + 15;
                    this.drums[4].semiToneIndex = this.root + 20;
                }
                break;
        	case 6:
        		if (this.bigTom == 0) {		// Major Thirds
    				this.drums[0].semiToneIndex = this.root; 
    				this.drums[1].semiToneIndex = this.root + 4;
    				this.drums[2].semiToneIndex = this.root + 8;
    				this.drums[3].semiToneIndex = this.root + 12;
    				this.drums[4].semiToneIndex = this.root + 16;
    				this.drums[5].semiToneIndex = this.root + 20;
    			} else if (this.bigTom == 1) {
    				this.drums[0].semiToneIndex = this.root; 		// Minor Thirds
    				this.drums[1].semiToneIndex = this.root + 3;
    				this.drums[2].semiToneIndex = this.root + 6;
    				this.drums[3].semiToneIndex = this.root + 9;
    				this.drums[4].semiToneIndex = this.root + 12;
    				this.drums[5].semiToneIndex = this.root + 15;
    			} else if (this.bigTom == 2) {
    				this.drums[0].semiToneIndex = this.root; 		// Hybrid
    				this.drums[1].semiToneIndex = this.root + 3;
    				this.drums[2].semiToneIndex = this.root + 6;
    				this.drums[3].semiToneIndex = this.root + 9;
    				this.drums[4].semiToneIndex = this.root + 12;
    				this.drums[5].semiToneIndex = this.root + 14;
    			}
        		break;
        	case 7:
        		if (this.bigTom == 0) {		// Minor Thirds
    				this.drums[0].semiToneIndex = this.root; 
    				this.drums[1].semiToneIndex = this.root + 3;
    				this.drums[2].semiToneIndex = this.root + 6;
    				this.drums[3].semiToneIndex = this.root + 9;
    				this.drums[4].semiToneIndex = this.root + 12;
    				this.drums[5].semiToneIndex = this.root + 15;
    				this.drums[6].semiToneIndex = this.root + 18;
    			} else if (this.bigTom == 1) {
    				this.drums[0].semiToneIndex = this.root; 		// Hybrid
    				this.drums[1].semiToneIndex = this.root + 2;
    				this.drums[2].semiToneIndex = this.root + 4;
    				this.drums[3].semiToneIndex = this.root + 7;
    				this.drums[4].semiToneIndex = this.root + 10;
    				this.drums[5].semiToneIndex = this.root + 13;
    				this.drums[6].semiToneIndex = this.root + 16;
    			}
        		break;
        	case 8:
    			this.drums[0].semiToneIndex = this.root; 		// Hybrid
    			this.drums[1].semiToneIndex = this.root + 2;
    			this.drums[2].semiToneIndex = this.root + 4;
    			this.drums[3].semiToneIndex = this.root + 7;
    			this.drums[4].semiToneIndex = this.root + 10;
    			this.drums[5].semiToneIndex = this.root + 13;
    			this.drums[6].semiToneIndex = this.root + 16;
    			this.drums[7].semiToneIndex = this.root + 19;
    			break;
            default:
                break;
            }
            //assigning fundamental pitch to each drum based on root, which corresponds to an index in noteFreqs Array;
            //avoid noteFreq step below?
            const noteFreqs = this.noteFreqs;
            _.each(this.drums, function(drumObject) {
            	drumObject.fundamental = noteFreqs[drumObject.semiToneIndex];
            });
	}
	setHeads() {
		_.each(this.drums, function(drum) {
			drum.getBatterHead();
			drum.getResoHead();
			drum.setNote();
		});
	}
}

class Drum {
	constructor(size, ownerPref) {
		this.size = size;
		this.ownerPref= ownerPref;
		this.fundamental = undefined;
	}
	getResQuotient() {
		if (this.ownerPref.topHigher) {
  			return [1.1181,2.1174,9.2274,10000][this.ownerPref.resLevel];
		} else {
			return [3.351,5.03,10.064,10000][this.ownerPref.resLevel];
		}
	}
	//condense head method into 2 or 1 parts rather than 4?
	getBatterHead() {
		this.batterFreq = this.ownerPref.topHigher ? this.getHigherHead() : this.getLowerHead();
	}
	getResoHead() {
		this.resoHead = this.ownerPref.topHigher ? this.getLowerHead() : this.getHigherHead();
	}
	//higher pitch
	getHigherHead() {
		var q = this.getResQuotient();
		return (this.fundamental/(2*q))* (Math.sqrt(1.0 + Math.pow(2*q/A, 2)) + 1);
	}
	//lower pitch
	getLowerHead() {
		var q = this.getResQuotient();
		return (this.fundamental/(2*q))* (Math.sqrt(1.0 + Math.pow(2*q/A, 2)) - 1);
	}
	setNote() {
		const letters = [ 0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6 ];
		const scale = ['C','D','E','F','G','A','B'];
		const sharps = [' ','#',' ','#',' ',' ','#',' ','#',' ','#',' '];
		this.octave = Math.floor((this.semiToneIndex / 12) + 1);
		var scaleLocation = letters[this.semiToneIndex % 12];
		this.fundamentalNote = scale[scaleLocation] + sharps[this.semiToneIndex % 12];
	}
}

class OwnerPref {
	constructor(topHigher, resLevel, pitchTranspose) {
		//boolean
		this.topHigher = topHigher;
		//0-4 ( low - med - high - max )
		this.resLevel = resLevel;
		//-3 - +3 (down three semi tones to up three semitones);
		this.pitchTranspose = pitchTranspose;
		this.topHigherToString = topHigher ? 'top higher': 'top lower';
		this.resLevelToString = ['low','mid','high','max'][resLevel];
	}
	showPreferences() {
		console.log(`this user likes ${this.topHigherToString} with ${this.resLevelToString} resonance.`);
	}
}

// drumsSizes -> array of integers representing the drum sizes
// topHigher -> boolean, user likes batter higher?
// resLevel -> int 0 - 3, [low,medium,high,'max']
// pitchTranspose -> -3 to 3, adjust pitch higher or lower, 0 for no change
function createTuning(drumSizes, topHigher, resLevel, pitchTranspose , brand) {
	var brand = brand || "";
	var pitchTranspose = pitchTranspose || 0;
	var user = new OwnerPref(topHigher, resLevel, pitchTranspose);
	var userSet = new DrumSet(drumSizes, brand, user);
	console.log(userSet.drums[1]);
}

createTuning([8,14],true, 0 , 1 , 'yamaha');

