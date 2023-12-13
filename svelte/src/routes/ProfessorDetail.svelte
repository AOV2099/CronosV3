<script>
	import { selectedPage, selectedProfesssor, subjectsData } from '../store';
	import SubjectPdf from './SubjectPDF.svelte';
	import { jsPDF } from 'jspdf';
	import html2canvas from 'html2canvas';
	import { onMount } from 'svelte';

	const emailKey = 'correo-e';
	let proffesorData = $subjectsData[$selectedProfesssor][0];
	let professorsName = proffesorData.profesor;
	let professorsEmail = proffesorData[emailKey];
	let professorsRFC = proffesorData.rfc;
	let professorsPhone = proffesorData.telefono;
	let professorsWorkerNumber = proffesorData.numTrabajador;
	let professorsSubjects = $subjectsData[$selectedProfesssor];

	let refreshPdf = false;

	//console.log('professorsSubjects', professorsSubjects);
	//console.log("data", proffesorData);

	async function generatePDF() {
		const scaleFactor = 1;
		const containers = document.querySelectorAll('.pdf-container');
		const batchSize = 50;
		const totalContainers = containers.length;

		let pageIndex = 0;

		for (let i = 0; i < containers.length; i += batchSize) {
			const doc = new jsPDF('landscape');
			for (let j = i; j < Math.min(i + batchSize, containers.length); j++) {
				const container = containers[j];
				const contentWidth = container.offsetWidth;

				if (contentWidth > doc.internal.pageSize.getWidth()) {
					container.style.transform = `scale(${scaleFactor})`;
					container.style.transformOrigin = '0 0';
				}

				const contentImage = await html2canvas(container, {
					scale: 2,
					useCORS: true,
					allowTaint: true,
					dpi: 144
				});

				const contentDataURL = contentImage.toDataURL('image/png');

				doc.addImage(
					contentDataURL,
					'PNG',
					0,
					0,
					doc.internal.pageSize.getWidth(),
					doc.internal.pageSize.getHeight()
				);

				if (j !== containers.length - 1) {
					doc.addPage();
				}
			}

			doc.save(`subjects_data_${pageIndex + 1}.pdf`);
			pageIndex++;
		}
	}

	async function saveData() {
		let selectedProfessorData = $subjectsData[$selectedProfesssor];
		selectedProfessorData.forEach((subject) => {
			subject[emailKey] = professorsEmail;
			subject.telefono = professorsPhone;
			subject.rfc = professorsRFC;
		});

		localStorage.setItem('processedData', JSON.stringify($subjectsData));

		alert('Datos guardados correctamente.');
	}

	async function updateSubject(subject) {
		const index = $subjectsData[$selectedProfesssor].findIndex(
			(item) => item.nombreAsignatura === subject.nombreAsignatura
		);

		if (index !== -1) {
			// Actualiza los valores de la asignatura específica en $subjectsData
			$subjectsData[$selectedProfesssor][index] = {
				...$subjectsData[$selectedProfesssor][index],
				nombreAsignatura: subject.nombreAsignatura,
				causa: subject.causa,
				categoria: subject.categoria,
				tipo: subject.tipo,
				cveAsignatura: subject.cveAsignatura,
				horario: subject.horario,
				salon: subject.salon,
				grupo: subject.grupo,
				planEstudios: subject.planEstudios
				// Actualiza los campos según los valores ingresados en los campos de entrada
			};

			refreshPdf = !refreshPdf;

			// Guarda los cambios en el almacenamiento local o en la base de datos
			localStorage.setItem('processedData', JSON.stringify($subjectsData));

			alert('Asignatura actualizada correctamente.');
		}
	}

	async function deleteSubject(subject) {
		const index = $subjectsData[$selectedProfesssor].findIndex(
			(item) => item.nombreAsignatura === subject.nombreAsignatura
		);

		if (index !== -1) {
			$subjectsData[$selectedProfesssor].splice(index, 1);

			professorsSubjects = $subjectsData[$selectedProfesssor];

			refreshPdf = !refreshPdf;
			// Guarda los cambios en el almacenamiento local o en la base de datos
			localStorage.setItem('processedData', JSON.stringify($subjectsData));

			alert('Asignatura eliminada correctamente.');
		}
	}
	/*
    if (index !== -1) {
			// Actualiza los valores de la asignatura específica en $subjectsData
			$subjectsData[$selectedProfesssor][index] = {
            ...$subjectsData[$selectedProfesssor][index],
            nombreAsignatura: ""
            causa: "",
            categoria: "",
            tipo: "",
            cveAsignatura: "",
            horario: "",
            salon: "",
            grupo: "",
            planEstudios: "",
        };

			// Guarda los cambios en el almacenamiento local o en la base de datos
			localStorage.setItem('processedData', JSON.stringify($subjectsData));

			alert('Asignatura actualizada correctamente.');
		}
        */

	onMount(async () => {});
</script>

<hr />
<div class="d-flex justify-content-between">
	<h2>
		{proffesorData.profesor}
	</h2>

	<div>
		<button
			class="btn btn-danger"
			style="color: white;"
			on:click={() => {
				selectedPage.set(3);
			}}
		>
			Regresar
			<i class="bi bi-x-square"> </i>
		</button>
	</div>
</div>
<hr />

<br />

<div class="row">
	<div class="col-6">
		<label for="basic-url" class="form-label">Nombre</label>
		<div class="input-group mb-3">
			<span class="input-group-text" id="basic-addon1">#</span>
			<input
				type="text"
				class="form-control"
				placeholder="Nombre"
				aria-label="Username"
				aria-describedby="basic-addon1"
				disabled
				bind:value={professorsName}
			/>
		</div>
	</div>

	<div class="col-6">
		<label for="basic-url" class="form-label">E-mail(s)</label>
		<div class="input-group mb-3">
			<span class="input-group-text" id="basic-addon1">#</span>
			<input
				type="text"
				class="form-control"
				placeholder="E-mail(s)"
				aria-label="Username"
				aria-describedby="basic-addon1"
				bind:value={professorsEmail}
			/>
		</div>
	</div>

	<div class="col-6">
		<label for="basic-url" class="form-label">RFC</label>
		<div class="input-group mb-3">
			<span class="input-group-text" id="basic-addon1">#</span>
			<input
				type="text"
				class="form-control"
				placeholder="RFC"
				aria-label="Username"
				aria-describedby="basic-addon1"
				disabled
				bind:value={professorsRFC}
			/>
		</div>
	</div>

	<div class="col-6">
		<label for="basic-url" class="form-label">Teléfono(s)</label>
		<div class="input-group mb-3">
			<span class="input-group-text" id="basic-addon1">#</span>
			<input
				type="text"
				class="form-control"
				placeholder="Teléfono"
				aria-label="Username"
				aria-describedby="basic-addon1"
				bind:value={professorsPhone}
			/>
		</div>
	</div>

	<div class="col-6">
		<label for="basic-url" class="form-label">No. Trabajador</label>
		<div class="input-group mb-3">
			<span class="input-group-text" id="basic-addon1">#</span>
			<input
				type="text"
				class="form-control"
				placeholder="No. Trabajador"
				aria-label="Username"
				aria-describedby="basic-addon1"
				disabled
				bind:value={professorsWorkerNumber}
			/>
		</div>
	</div>
</div>

<div class="d-flex justify-content-end">
	<div>
		<button
			class="btn btn-primary"
			style="color: white;"
			on:click={async () => {
				await saveData();
			}}
		>
			Actualizar Datos
			<i class="bi bi bi-cloud-upload"> </i>
		</button>
	</div>
</div>

{#key professorsSubjects}
	{#each professorsSubjects as subject}
		<hr />

		<h5>
			{subject.nombreAsignatura}
		</h5>
		<hr />
		<div class="row">
			<div class="col-6">
				<label for="basic-url" class="form-label">Asignatura</label>
				<div class="input-group mb-3">
					<span class="input-group-text" id="basic-addon1">#</span>
					<input
						type="text"
						class="form-control"
						placeholder="Asignatura"
						aria-label="Username"
						aria-describedby="basic-addon1"
						bind:value={subject.nombreAsignatura}
					/>
				</div>
			</div>

			<div class="col-6">
				<label for="basic-url" class="form-label">Causa</label>
				<div class="input-group mb-3">
					<span class="input-group-text" id="basic-addon1">#</span>
					<input
						type="text"
						class="form-control"
						aria-label="Username"
						aria-describedby="basic-addon1"
						bind:value={subject.causa}
					/>
				</div>
			</div>

			<div class="col-6">
				<label for="basic-url" class="form-label">Categoría</label>
				<div class="input-group mb-3">
					<span class="input-group-text" id="basic-addon1">#</span>
					<input
						type="text"
						class="form-control"
						aria-label="Username"
						aria-describedby="basic-addon1"
						bind:value={subject.categoria}
					/>
				</div>
			</div>

			<div class="col-6">
				<label for="basic-url" class="form-label">Mov.</label>
				<div class="input-group mb-3">
					<span class="input-group-text" id="basic-addon1">#</span>
					<input
						type="text"
						class="form-control"
						aria-label="Username"
						aria-describedby="basic-addon1"
						bind:value={subject.tipo}
					/>
				</div>
			</div>

			<div class="col-6">
				<label for="basic-url" class="form-label">Clave Asignatura</label>
				<div class="input-group mb-3">
					<span class="input-group-text" id="basic-addon1">#</span>
					<input
						type="text"
						class="form-control"
						aria-label="Username"
						aria-describedby="basic-addon1"
						bind:value={subject.cveAsignatura}
					/>
				</div>
			</div>

			<div class="col-6">
				<label for="basic-url" class="form-label">Horario</label>
				<div class="input-group mb-3">
					<span class="input-group-text" id="basic-addon1">#</span>
					<input
						type="text"
						class="form-control"
						aria-label="Username"
						aria-describedby="basic-addon1"
						bind:value={subject.horario}
					/>
				</div>
			</div>

			<div class="col-6">
				<label for="basic-url" class="form-label">Salón</label>
				<div class="input-group mb-3">
					<span class="input-group-text" id="basic-addon1">#</span>
					<input
						type="text"
						class="form-control"
						aria-label="Username"
						aria-describedby="basic-addon1"
						bind:value={subject.salon}
					/>
				</div>
			</div>

			<div class="col-6">
				<label for="basic-url" class="form-label">Grupo</label>
				<div class="input-group mb-3">
					<span class="input-group-text" id="basic-addon1">#</span>
					<input
						type="text"
						class="form-control"
						aria-label="Username"
						aria-describedby="basic-addon1"
						bind:value={subject.grupo}
					/>
				</div>
			</div>

			<div class="col-6">
				<label for="basic-url" class="form-label">Plan</label>
				<div class="input-group mb-3">
					<span class="input-group-text" id="basic-addon1">#</span>
					<input
						type="text"
						class="form-control"
						aria-label="Username"
						aria-describedby="basic-addon1"
						bind:value={subject.planEstudios}
					/>
				</div>
			</div>
		</div>

		<div class="d-flex justify-content-end">
			<div>
				{#if professorsSubjects.length > 1}
					<button
						class="btn btn-danger"
						style="color: white;"
						on:click={async () => {
							await deleteSubject(subject);
						}}
					>
						Borrar Asignatura
						<i class="bi bi bi-trash"> </i>
					</button>
				{/if}

				<button
					class="btn btn-primary"
					style="color: white;"
					on:click={async () => {
						await updateSubject(subject);
					}}
				>
					Actualizar Asignatura
					<i class="bi bi bi-cloud-upload"> </i>
				</button>
			</div>
		</div>
	{/each}
{/key}

<hr />
<div class="d-flex justify-content-between">
	<h4>Reporte de horas</h4>

	<div>
		<button
			class="btn btn-success"
			style="color: white;"
			on:click={() => {
				generatePDF();
			}}
		>
			Descargar
			<i class="bi bi-filetype-pdf"> </i>
		</button>
	</div>
</div>
<hr />
<!--PDF-->
<div class="d-flex justify-content-center pdf-container">
	<!--
		<SubjectPdf subjectKey={$selectedProfesssor} />

	-->

	{#if refreshPdf}
		<SubjectPdf subjectKey={$selectedProfesssor} />
	{:else}
		<SubjectPdf subjectKey={$selectedProfesssor} />
	{/if}
</div>

<style>
</style>
