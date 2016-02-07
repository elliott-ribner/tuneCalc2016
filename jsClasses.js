"use strict";
var _ = require('lodash');
const tomSizes = [ 18, 16, 15, 14, 13, 12, 10, 8 ];
const letters = [ 0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6 ];
const scale = ['C','D','E','F','G','A','B'];
const sharps = [' ','#',' ','#',' ',' ','#',' ','#',' ','#',' '];
const A = 1 / 1.72;


class DrumSet {
	constructor(drums,brand,owner) {
		this.drums = drums;
		this.owner = owner;
		// location of smallest Tom in tom sizes array
		this.smallTom = _.indexOf( tomSizes, _.sortBy(drums, ['size'])[0].size);
		// location of biggest Tom in tom sizes array
		this.bigTom = _.indexOf( tomSizes, _.sortBy(drums, ['size']).reverse()[0].size);
		this.numberToms = drums.length;
		this.tomGap = this.smallTom - this.bigTom - this.numberToms + 1;
		this.createSemiToneArray();
		this.getRoot();
		this.setFrequencyIndictor();
		this.setHeads();
	}
	getRoot() {
		let rootsArray = [11,14,16,17,19,22,26,31];
		//maping index of bigTom value from tomSizes array to rootsArray
		this.root = rootsArray[this.bigTom];
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
        		this.drums[0].fundamental = this.noteFreqs[this.root]; 
        		break;
        	case 2:
        		if (this.tomGap <3) {
        			this.drums[0].fundamental = this.noteFreqs[this.root]; 		// Perfect Fifth
        			this.drums[1].fundamental = this.noteFreqs[this.root + 7];
        		} else {
        			this.drums[0].fundamental = this.noteFreqs[this.root]; 		// Octave
        			this.drums[1].fundamental = this.noteFreqs[this.root + 12];
        		}
        		break;
            case 3:
                if (this.tomGap < 2){		// Major Chord
	                this.drums[0].fundamental = this.noteFreqs[this.root]; 
	                this.drums[1].fundamental = this.noteFreqs[this.root + 4];
	                this.drums[2].fundamental = this.noteFreqs[this.root + 7];
                } else if (this.tomGap === 2){ // Major Thirds
	                this.drums[0].fundamental = this.noteFreqs[this.root]; 
	                this.drums[1].fundamental = this.noteFreqs[this.root + 4];
	                this.drums[2].fundamental = this.noteFreqs[this.root + 8];
                } else {
	                this.drums[0].fundamental = this.noteFreqs[this.root]; 		// Perfect Fourths
	                this.drums[1].fundamental = this.noteFreqs[this.root + 5];
	                this.drums[2].fundamental = this.noteFreqs[this.root + 10];
                }
                break;
	        case 4:
	            if (this.tomGap < 2){		// Call to the Post
		            this.drums[0].fundamental = this.noteFreqs[this.root]; 
		            this.drums[1].fundamental = this.noteFreqs[this.root + 5];
		            this.drums[2].fundamental = this.noteFreqs[this.root + 9];
		            this.drums[3].fundamental = this.noteFreqs[this.root + 12];
	            } else if (this.tomGap === 2){ // Major Thirds
		            this.drums[0].fundamental = this.noteFreqs[this.root]; 
		            this.drums[1].fundamental = this.noteFreqs[this.root + 4];
		            this.drums[2].fundamental = this.noteFreqs[this.root + 8];
		            this.drums[3].fundamental = this.noteFreqs[this.root + 12];
	            } else {
		            this.drums[0].fundamental = this.noteFreqs[this.root]; 		// Perfect Fourths
		            this.drums[1].fundamental = this.noteFreqs[this.root + 5];
		            this.drums[2].fundamental = this.noteFreqs[this.root + 10];
		            this.drums[3].fundamental = this.noteFreqs[this.root + 15];
	            }
	            break;
            case 5:
                if (this.tomGap < 2){		// Major Thirds
                    this.drums[0].fundamental = this.noteFreqs[this.root]; 
                    this.drums[1].fundamental = this.noteFreqs[this.root + 4];
                    this.drums[2].fundamental = this.noteFreqs[this.root + 8];
                    this.drums[3].fundamental = this.noteFreqs[this.root + 12];
                    this.drums[4].fundamental = this.noteFreqs[this.root + 16];
                } else {
                    this.drums[0].fundamental = this.noteFreqs[this.root]; 		// Perfect Fourths
                    this.drums[1].fundamental = this.noteFreqs[this.root + 5];
                    this.drums[2].fundamental = this.noteFreqs[this.root + 10];
                    this.drums[3].fundamental = this.noteFreqs[this.root + 15];
                    this.drums[4].fundamental = this.noteFreqs[this.root + 20];
                }
                break;
        	case 6:
        		if (this.bigTom == 0) {		// Major Thirds
    				this.drums[0].fundamental = this.noteFreqs[this.root]; 
    				this.drums[1].fundamental = this.noteFreqs[this.root + 4];
    				this.drums[2].fundamental = this.noteFreqs[this.root + 8];
    				this.drums[3].fundamental = this.noteFreqs[this.root + 12];
    				this.drums[4].fundamental = this.noteFreqs[this.root + 16];
    				this.drums[5].fundamental = this.noteFreqs[this.root + 20];
    			} else if (this.bigTom == 1) {
    				this.drums[0].fundamental = this.noteFreqs[this.root]; 		// Minor Thirds
    				this.drums[1].fundamental = this.noteFreqs[this.root + 3];
    				this.drums[2].fundamental = this.noteFreqs[this.root + 6];
    				this.drums[3].fundamental = this.noteFreqs[this.root + 9];
    				this.drums[4].fundamental = this.noteFreqs[this.root + 12];
    				this.drums[5].fundamental = this.noteFreqs[this.root + 15];
    			} else if (this.bigTom == 2) {
    				this.drums[0].fundamental = this.noteFreqs[this.root]; 		// Hybrid
    				this.drums[1].fundamental = this.noteFreqs[this.root + 3];
    				this.drums[2].fundamental = this.noteFreqs[this.root + 6];
    				this.drums[3].fundamental = this.noteFreqs[this.root + 9];
    				this.drums[4].fundamental = this.noteFreqs[this.root + 12];
    				this.drums[5].fundamental = this.noteFreqs[this.root + 14];
    			}
        		break;
        	case 7:
        		if (this.bigTom == 0) {		// Minor Thirds
    				this.drums[0].fundamental = this.noteFreqs[this.root]; 
    				this.drums[1].fundamental = this.noteFreqs[this.root + 3];
    				this.drums[2].fundamental = this.noteFreqs[this.root + 6];
    				this.drums[3].fundamental = this.noteFreqs[this.root + 9];
    				this.drums[4].fundamental = this.noteFreqs[this.root + 12];
    				this.drums[5].fundamental = this.noteFreqs[this.root + 15];
    				this.drums[6].fundamental = this.noteFreqs[this.root + 18];
    			} else if (this.bigTom == 1) {
    				this.drums[0].fundamental = this.noteFreqs[this.root]; 		// Hybrid
    				this.drums[1].fundamental = this.noteFreqs[this.root + 2];
    				this.drums[2].fundamental = this.noteFreqs[this.root + 4];
    				this.drums[3].fundamental = this.noteFreqs[this.root + 7];
    				this.drums[4].fundamental = this.noteFreqs[this.root + 10];
    				this.drums[5].fundamental = this.noteFreqs[this.root + 13];
    				this.drums[6].fundamental = this.noteFreqs[this.root + 16];
    			}
        		break;
        	case 8:
    			this.drums[0].fundamental = this.noteFreqs[this.root]; 		// Hybrid
    			this.drums[1].fundamental = this.noteFreqs[this.root + 2];
    			this.drums[2].fundamental = this.noteFreqs[this.root + 4];
    			this.drums[3].fundamental = this.noteFreqs[this.root + 7];
    			this.drums[4].fundamental = this.noteFreqs[this.root + 10];
    			this.drums[5].fundamental = this.noteFreqs[this.root + 13];
    			this.drums[6].fundamental = this.noteFreqs[this.root + 16];
    			this.drums[7].fundamental = this.noteFreqs[this.root + 19];
    			break;
            default:
                break;
            }
	}
	setHeads() {
		_.each(this.drums, function(drum) {
			drum.getBatterHead();
			drum.getResoHead();
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
}

class OwnerPref {
	constructor(topHigher, resLevel) {
		//boolean
		this.topHigher = topHigher;
		//0-4 ( low - med - high - max )
		this.resLevel = resLevel;
		this.topHigherToString = topHigher ? 'top higher': 'top lower';
		this.resLevelToString = ['low','mid','high','max'][resLevel];
	}
	showPreferences() {
		console.log(`this user likes ${this.topHigherToString} with ${this.resLevelToString} resonance.`);
	}
}

var elliottsPreference = new OwnerPref(true, 0);
elliottsPreference.showPreferences();
var smallDrum = new Drum(8, elliottsPreference);
var bigDrum = new Drum(14, elliottsPreference);
var elliottSet = new DrumSet([bigDrum, smallDrum],'yamaha', elliottsPreference);
console.log(elliottSet.drums[1])
