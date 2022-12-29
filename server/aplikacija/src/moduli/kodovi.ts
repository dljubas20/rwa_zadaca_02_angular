import crypto from 'crypto';

export function kreirajSHA256(tekst : string, sol : string = "") : string {
	const hash = crypto.createHash('sha256');
	hash.write(tekst+sol);
	var izlaz = hash.digest('hex');
	hash.end();
	return izlaz;
}

export function dajNasumceBroj(min : number, max : number) : number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}
