<script>
	import { fade } from 'svelte/transition';
	import { selectedPage } from '../store.js';
	import FileDumper from './FileDumper.svelte';
	import Subjects from './Subjects.svelte';
	import SubjectPdf from './SubjectPDF.svelte';
	import SubjectTable from './SubjectTable.svelte';
	import SubjectsTables from './SubjectsTable.svelte';
	import ProfessorDetail from './ProfessorDetail.svelte';

	const pages = [
		FileDumper, //0
		Subjects, //1
		SubjectPdf, //2
		SubjectsTables, //3
        ProfessorDetail, //4
	];

	let viewPortContent = 3;

	function changeMainContent(page) {
		selectedPage.set(page);
	}

	function updateViewPortContent() {
		//console.log("SELECTED PAGE: " + pages[$selectedPage].name);

		viewPortContent = pages[$selectedPage];
	}

	updateViewPortContent();
</script>

<div class="container-lg">
	<div class="card shador-lg" style="height:auto">
		<div>
			{#if viewPortContent == pages[$selectedPage]}
				<div id="main-page-container" on:outroend={updateViewPortContent} transition:fade>
					<svelte:component this={viewPortContent} />
				</div>
			{/if}
		</div>
	</div>

	<br />
	<br />
</div>

<style>
	.card {
		padding: 24px;
		margin: 38px;
		border-width: 0px;
	}
</style>
