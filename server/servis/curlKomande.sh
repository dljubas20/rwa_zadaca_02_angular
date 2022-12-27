port=12259
server="localhost"
echo "GET"
# curl -X GET "http://$server:$port/api/korisnici/"
echo ""
echo "POST"
#curl -X POST "http://$server:$port/api/korisnici/" -H 'Content-Type: application/json' -d '{"ime":"Test", "prezime":"Test", "lozinka":"123456", "email":"test3@foi.unizg.hr", "korime":"test"}'
echo ""
echo "DELETE"
curl -X DELETE "http://$server:$port/api/korisnici/?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""
echo "PUT"
curl -X PUT "http://$server:$port/api/korisnici/?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""
echo "GET"
curl -X GET "http://$server:$port/api/korisnici/ggggg?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""
echo "GET prijava tocna"
curl -X POST "http://$server:$port/api/korisnici/ggggg/prijava?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@" -H 'Content-Type: application/json' -d '{"lozinka":"123456"}'
echo ""
echo "GET prijava kriva"
curl -X POST "http://$server:$port/api/korisnici/ggggg/prijava?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@" -H 'Content-Type: application/json' -d '{"lozinka":"12345"}'
echo ""
echo "PUT"
curl -X PUT "http://$server:$port/api/korisnici/ggggg?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@" -H 'Content-Type: application/json' -d '{"ime":"Test2", "prezime":"Test", "lozinka":"123456", "email":"test2@foi.unizg.hr"}'
echo ""
echo "DELETE"
curl -X DELETE "http://$server:$port/api/korisnici/test?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""
echo "POST"
curl -X POST "http://$server:$port/api/korisnici/test?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""

echo "PUT aktivacija"
curl -X PUT "http://$server:$port/api/korisnici/ggggg/aktivacija?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@" -H 'Content-Type: application/json' -d '{"korime":"ggggg"}'
echo ""

echo "DELETE nesto1"
curl -X DELETE "http://$server:$port/api/zanr/?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""

echo "POST"
curl -X POST "http://$server:$port/api/zanr/1?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""

echo "DELETE nesto2"
curl -X DELETE "http://$server:$port/api/zanr/3?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""

echo "POST"
curl -X POST "http://$server:$port/api/tmdb/zanr?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""

echo "PUT"
curl -X PUT "http://$server:$port/api/tmdb/zanr?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""

echo "DELETE"
curl -X DELETE "http://$server:$port/api/tmdb/zanr?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""

echo "POST"
curl -X POST "http://$server:$port/api/tmdb/filmovi?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""

echo "PUT"
curl -X PUT "http://$server:$port/api/tmdb/filmovi?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""

echo "DELETE"
curl -X DELETE "http://$server:$port/api/tmdb/filmovi?korime=korisnickoime123&lozinka=-nisam_lozinka123456789@"
echo ""