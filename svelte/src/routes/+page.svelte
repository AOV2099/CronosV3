<script>
	import { onMount } from 'svelte';
	import { isLogged, subjectsData } from '../store';
	import LoginPage from './LoginPage.svelte';
	import MainPage from './MainPage.svelte';
	import Papa from 'papaparse';

	async function readCSV(data) {
    try {
        const results = Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true
        });

        const parsedData = results.data.filter((row) => {
            return true;
        });

        const groupedData = parsedData.reduce((acc, row) => {
            const rfc = row['rfc'];
            if (!acc[rfc]) {
                acc[rfc] = [];
            }
            acc[rfc].push(row);
            return acc;
        }, {});

        localStorage.setItem('processedData', JSON.stringify(groupedData));

        subjectsData.set(groupedData);
        //selectedPage.set(1); // Subjects

        return groupedData; // Devuelve los datos agrupados
    } catch (error) {
        console.error('Error al leer el archivo CSV:', error);
    }
}

async function loadData() {
    console.log('Cargando datos...');
    const storedData = localStorage.getItem('processedData');

    if (storedData) {
        subjectsData.set(JSON.parse(storedData));
        console.log('Datos cargados correctamente.');
        return;
    }

    try {
        const response = await fetch('./files/PROP.csv');

        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo CSV.');
        }

        const csvData = await response.text();
        const processedData = await readCSV(csvData);

        localStorage.setItem('processedData', JSON.stringify(processedData));

        console.log('Datos cargados correctamente desde el archivo CSV.');
    } catch (error) {
        console.error('Error al cargar los datos desde el archivo CSV:', error);
    }
}


	onMount(async () => {
		await loadData();
	});

</script>

<!-- Nothing more in case we need a login -->

{#if $isLogged}
	<MainPage />
{:else}
	<LoginPage />
{/if}
