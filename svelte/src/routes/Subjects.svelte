<script>
	import { selectedPage, subjectsData } from '../store';
	import SubjectTable from './SubjectTable.svelte';
	import { jsPDF } from 'jspdf';
	import html2canvas from 'html2canvas';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import SubjectPdf from './SubjectPDF.svelte';

	async function generateSubjectHTML(subject) {
		return `
    

        <div class="table-responsive">

            <table class="table">
                <tr>
                    <th colspan="3"></th>
                    <th colspan="3">INICIO</th>
                    <th colspan="3">TERMINO</th>
                    <th colspan="4"></th>
                    <th colspan="3">HORAS</th>
                    <th colspan="2"></th>
                </tr>
                <tr style="text-align:center;">
                    <th>Mov.</th>
                    <th>Causa</th>
                    <th>Categoría</th>
                    <th>D</th>
                    <th>M</th>
                    <th>A</th>
                    <th>D</th>
                    <th>M</th>
                    <th>A</th>
                    <th>Plan</th>
                    <th>CVE <br />Asig.</th>
                    <th>Nombre <br /> Asignatura / Actividad</th>
                    <th>Grupo</th>
                    <th>Teo.</th>
                    <th>Prác.</th>
                    <th>Tot.</th>
                    <th>Horario</th>
                    <th>Salón</th>
                </tr>
                <tr>
                    <td>${subject.tipo}</td>
                    <td>${subject.causa}</td>
                    <td>${subject.categoria}</td>
                    <td>${subject.Texto162}</td>
                    <td>${subject.Texto168}</td>
                    <td>${subject.Texto169}</td>
                    <td>${subject.Texto170}</td>
                    <td>${subject.Texto171}</td>
                    <td>${subject.Texto172}</td>
                    <td>${subject.Texto126}</td>
                    <td>${subject.cveAsignatura}</td>
                    <td>${subject.nombreAsignatura}</td>
                    <td class="thCentrado">${subject.grupo}</td>
                    <td class="thCentrado">${subject.horasTeoricas}</td>
                    <td class="thCentrado">${subject.horasPracticas}</td>
                    <td class="thCentrado">${subject.horasTotal}</td>
                    <td class="thCentrado">${subject.horario}</td>
                    <!--<td class="thCentrado">${subject.horario}Lu,Mi <br />17:00-18:30 <br />17:00-18:30</td>-->
                    <td class="thCentrado">${subject.salon}</td>
                </tr>
                <tr>
                    <td colspan="9"></td>
                    <td style="text-align: right;" colspan="3" class="filaTotales"><strong>Totales:</strong> </td>
                    <td></td>
                    <td class="thCentrado filaTotales">0</td>
                    <td class="thCentrado filaTotales">3</td>
                    <td class="thCentrado filaTotales">3</td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td colspan="18" class="filaTotales" style="text-align: left;" >Observaciones: </td>
                </tr>
            </table>
        </div>

        <hr />

    `;
	}

	async function generatePDF(subjectData) {
		const doc = new jsPDF();

		// Obtener el HTML del sujeto
		const subjectHTML = await generateSubjectHTML(subjectData);
		console.log('SUBJECT HTML: ', subjectHTML);
		// Crear el contenido del PDF con el HTML obtenido
		const htmlContent = `
        <html>
            <head>
                <title>Título del PDF</title>
                <!-- Agrega estilos si es necesario -->
                <style>
                    /* Estilos CSS para el contenido del PDF */
                    /* ... */
                </style>
            </head>
            <body>
                <!-- Renderiza el HTML del sujeto dentro del PDF -->
                <div class="pdf-content">
                    <h4>CRONOS V3</h4>
                    ${subjectHTML} <!-- Insertar el HTML generado del sujeto -->
                </div>
            </body>
        </html>
    `;

		// Agregar el contenido al PDF y guardarlo
		doc.html(htmlContent, {
			callback: () => {
				doc.save('componente_svelte.pdf');
			}
		});
	}
</script>

<br />
<hr />
<div class="d-flex justify-content-between">
	<h1>PROPUESTAS</h1>

	<div class="d-flex align-items-center">
		<button
			class="btn btn-danger"
			style="margin-right: 8px;"
			on:click={() => {
				selectedPage.set(0);
			}}
		>
			Regresar <i class="bi bi-x-square"></i>
		</button>

		<button
			class="btn btn-success"
			on:click={() => {
				generatePDF($subjectsData[0]);
			}}
		>
			Descargar <i class="bi bi-file-earmark-arrow-down"></i>
		</button>
	</div>
</div>
<hr />
<br />

<div>
	{#each $subjectsData as subject}
		<div class="d-flex justify-content-center">
			<SubjectPdf {subject} />
		</div>

		<br />
		<br />
	{/each}
</div>

