import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Pokedex } from '../pokemon.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent {
  pokemon: any = {} as Pokedex;

  constructor(private service: Pokedex) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  backwardPokemon() {
    this.service.idChave = this.pokemon.id;
    if (this.service.idChave <= 0) {
      this.service.idChave = this.service.idChave + 1;
    } else {
      this.service.idChave = this.service.idChave - 1;
    }
    this.service.getPokemonByID().subscribe({
      next: (data) => {
        this.pokemon = data;
        this.pokemon.img = data.sprites.other.home.front_default;
      },
    });
  }

  forwardPokemon() {
    this.service.idChave = this.pokemon.id;
    this.service.idChave = this.service.idChave + 1;
    this.service.getPokemonByID().subscribe({
      next: (data) => {
        this.pokemon = data;
        this.pokemon.img = data.sprites.other.home.front_default;
      },
    });
  }

  loadPokemon() {
    this.service.getPokemonByID().subscribe({
      next: (data) => {
        this.pokemon = data;
        this.pokemon.img = data.sprites.other.home.front_default;
      },
    });
  }

  getPokeId(): number {
    return this.pokemon.id;
  }

  FixName() {
    return this.pokemon.name.split("-");
  }

}
