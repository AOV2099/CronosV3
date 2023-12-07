<script>
	import { toasts } from 'svelte-toasts';
	import { selectedPage, subjectsData } from '../store';

	let file;

	function handleFileChange(event) {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			file = selectedFile;
		} else {
			file = undefined;
		}
	}

	async function readCSV() {
    if (!file || file === undefined) {
        toasts.error('Por favor, selecciona un archivo CSV.');
        return;
    }

    try {
        const fileData = await file.text();
        const dataArray = fileData.split('\n');

        const headers = dataArray
            .shift()
            .split(';')
            .map(header => header.trim().replace(/[\n\r]/g, '')); // Limpiar "\n" y "\r"

        const jsonData = [];

        dataArray.forEach(line => {
            const values = line.split(';');

            const obj = {};
            let isEmpty = true;

            values.forEach((value, index) => {
                const subValues = value.split(',');

                if (subValues.length > 1) {
                    const subHeaders = headers[index].split(',').map(header => header.trim());

                    subValues.forEach((subValue, subIndex) => {
                        obj[subHeaders[subIndex]] = subValue.trim();
                        if (subValue.trim() !== '') {
                            isEmpty = false;
                        }
                    });
                } else {
                    obj[headers[index]] = value.trim();
                    if (value.trim() !== '') {
                        isEmpty = false;
                    }
                }
            });

            if (!isEmpty) {
                jsonData.push(obj);
            }
        });

        //console.log('Datos del CSV:', jsonData);
        subjectsData.set(jsonData);
        selectedPage.set(1); // Subjects
    } catch (error) {
        console.error('Error al leer el archivo CSV:', error);
        toasts.error('Hubo un error al leer el archivo CSV.');
    }
}

</script>

<h1>CRONOS V3</h1>

<hr />
<br />

<div>
	<label for="formFile" class="form-label">Selecciona el archivo a analizar</label>
	<input
		class="form-control"
		type="file"
		id="formFile"
		accept=".csv"
		on:change={handleFileChange}
	/>
</div>

<br />

<div class="d-flex justify-content-center">
	<button
		class="btn btn-primary"
		style="width: 100%;"
		on:click={() => {
			readCSV();
		}}>Subir</button
	>
</div>

<br />
