package main

import (
	"fmt"
	"net/http"
	"text/template"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Code  string
	Price uint
}

const port = ":8080"

func renderTemplate(w http.ResponseWriter, tmpl string) {
	t, err := template.ParseFiles("./templates/" + tmpl + ".page.tmpl")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	t.Execute(w, nil)
}

func Home(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "home")
}

func main() {
	dsn := "host=localhost port=5433 dbname=discode-user user=postgres password=admin sslmode=prefer connect_timeout=10" //Postgresql server connection string
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println(db)
	mux := http.NewServeMux()
	cssFileServer := http.FileServer(http.Dir("CSS"))
	mux.Handle("/CSS/", http.StripPrefix("/CSS/", cssFileServer))
	mux.HandleFunc("/", Home)
	fmt.Println("(http://localhost:8080) - Server started on port", port)
	http.ListenAndServe(port, mux)
}
