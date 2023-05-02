

import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Pokedex } from '../pokemon.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  pokemon: any = {} as Pokedex;
  nomePesquisado : string = "";
  idPesquisado : string = "";
  idConvert : number = parseInt(this.idPesquisado);

  constructor(private service: Pokedex) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  searchPokemon() {
    if(this.nomePesquisado != "" && this.idPesquisado == ""){
      this.service.nomeChave = this.nomePesquisado.toLowerCase();
      this.service.idChave == this.pokemon.id;
      this.service.getPokemon().subscribe(
        {
          next: data => {
            this.pokemon = data;
            this.pokemon.img = data.sprites.other.home.front_default;
          }
        }
      );
      this.nomePesquisado = "";
    }
  }




  backwardPokemon() {
    this.service.idChave = this.pokemon.id;
    if (this.service.idChave <= 0) {
      this.service.idChave = this.service.idChave + 1;
    } else {
      this.service.idChave = this.service.idChave - 1;
    }
    this.service.getPokemonByID().subscribe(
      {
        next: data => {
          this.pokemon = data;
          this.pokemon.img = data.sprites.other.home.front_default;
        }
      }
    );
  }

  forwardPokemon() {
    this.service.idChave = this.pokemon.id;
    this.service.idChave = this.service.idChave + 1;
    this.service.getPokemonByID().subscribe(
      {
        next: data => {
          this.pokemon = data;
          this.pokemon.img = data.sprites.other.home.front_default;
        }
      }
    );
  }

  loadPokemon() {
    this.service.getPokemonByID().subscribe(
      {
        next: data => {
          this.pokemon = data;
          this.pokemon.img = data.sprites.other.home.front_default;
        }
      }
    );
  }

  getPokeId(): number{
    return this.pokemon.id;
  }

  LoadType(): string{
    return this.pokemon.type;
  }
}
