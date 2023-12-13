
import { writable } from 'svelte/store';

export var selectedPage = writable(3);
export var isLogged = writable(false);
export var subjectsData = writable([]);
export var selectedProfesssor = writable("");

