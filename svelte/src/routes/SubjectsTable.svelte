<script>
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { selectedPage, selectedProfesssor, subjectsData } from '../store';
	import { onMount } from 'svelte';
	import Search from '../Tables/Search.svelte';
	import RowsPerPage from '../Tables/RowsPerPage.svelte';
	import RowCount from '../Tables/RowCount.svelte';
	import Pagination from '../Tables/Pagination.svelte';

	let isMounted = false;
	let proffesors = [];

	const handler = new DataHandler(sortProfessors(), { rowsPerPage: 15 });
	const rows = handler.getRows();

	function sortProfessors() {
		let proffesors = [];
		Object.keys($subjectsData).forEach((proffesorsKeys) => {
			proffesors.push($subjectsData[proffesorsKeys][0]);
			//console.log('PROFESOR', $subjectsData[proffesorsKeys][0]);
		});

		return proffesors;
	}

	onMount(async () => {
		isMounted = true;
	});
</script>

{#if isMounted}
	<hr />
	<h1>PROFESORES</h1>
	<hr />
	<header>
		<div class="d-flex justify-content-between">
			<div class="d-flex">
				<Search {handler} />
				<!--

                    <RowsPerPage {handler} />
                -->
			</div>

			<div>
				<button
					class="btn btn-success"
					style="color: white;"
					on:click={() => {
						selectedPage.set(1);
					}}
				>
					Ver todos
					<i class="bi bi-people-fill"> </i>
				</button>
			</div>
		</div>
	</header>

	<div class="table-responsive table-sm">
		<table class="table table-striped table-hover table-sm">
			<thead>
				<tr>
					<Th {handler} orderBy="profesor">PROFESOR</Th>
					<Th {handler} orderBy="numTrabajador">TRABAJADOR</Th>
					<Th {handler} orderBy="rfc">RFC</Th>
					<Th {handler} orderBy="correo-e">CORREO(s)</Th>
					<Th {handler} orderBy="telefono">TELEFONO(s)</Th>
					<th>DETALLES</th>
				</tr>
			</thead>
			<tbody class="table-striped table-sm">
				{#each $rows as row}
					<tr>
						<td>
							{row.profesor}
						</td>

						<td>
							{row.numTrabajador}
						</td>
						<td>
							{row.rfc}
						</td>
						<td>
							{row['correo-e']}
						</td>
						<td>
							{row.telefono}
						</td>

						<td>
							<div class="d-flex justify-content-end">
								<button
									class="btn btn-info"
									style="color: white;"
									on:click={() => {
										selectedProfesssor.set(row.rfc);
										selectedPage.set(4);
									}}
								>
									<i class="bi bi-file-person-fill"></i>
								</button>
							</div>
						</td>
					</tr>
				{/each}

				<tr>
					<td> </td>
				</tr>
			</tbody>
		</table>
	</div>

	<br />

	<footer>
		<div class="d-flex justify-content-between">
			<RowCount {handler} />
			<Pagination {handler} />
		</div>
	</footer>
{/if}

<!--
    <div class="table-responsive table-sm">
		<table class="table table-striped table-hover table-sm">
			<thead>
				<tr>
					<th>PROFESOR</th>
					<th>TRABAJADOR</th>
					<th>RFC</th>
					<th>CORREO(s)</th>
					<th>TELEFONO(s)</th>
				</tr>
			</thead>
			<tbody class="table-striped table-sm">
				{#each proffesors as prof}
					<tr>
						<td>
							{prof.profesor}
						</td>

						<td>
							{prof.numTrabajador}
						</td>
						<td>
							{prof.rfc}
						</td>
						<td>
							{prof['correo-e']}
						</td>
						<td>
							{prof.telefono}
						</td>
					</tr>
				{/each}

				<tr>
					<td> </td>
				</tr>
			</tbody>
		</table>
	</div>
-->

<br />

<style>
	thead th.selection {
		width: 48px;
		padding-left: 24px;
	}
	tbody tr {
		transition: all, 0.2s;
	}

	td.selection {
		padding-left: 24px;
	}
</style>
