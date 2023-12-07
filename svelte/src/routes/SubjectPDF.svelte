<script>
	import { selectedPage, subjectsData } from '../store';
	import SubjectTable from './SubjectTable.svelte';

	export let subject;
</script>

<div class="contenedorCarta">

    <div id="content" style="height: 100%;">

        <div class="docHeader align-self-start">
    
            <div class="row">
                <div class="col-3">
                    <div class="unam-logo"><img src="../static/unam-logo.png" alt="Logo UNAM" /></div>
                </div>
        
                <div class="col-6">
                    <div class="docHeader">UNIVERSIDAD NACIONAL AUTÓNOMA DE MÉXICO</div>
                    <div class="docHeader">FACULTAD DE ESTUDIOS SUPERIORES ARAGÓN</div>
                    <div class="docHeader">FORMA DE MOVIMIENTOS DE PERSONAL ACADÉMICO</div>
                    <div class="docHeader">PERIODO ESCOLAR 2024-I</div>
                </div>
        
                <div class="col-3">
                    <div class="aragon-logo"><img src="aragon-logo.png" alt="Logo FES Aragon" /></div>
                </div>
            </div>
        
            <br />
        
            <!-- First table with career area and responsible unit -->
            <div class="row tableCareer">
                <div class="col blue-border">
                    CARRERA O ÁREA:<strong> INGENIERIA EN COMPUTACION</strong>
                </div>
        
                <div class="col blue-border">
                    UNIDAD RESPONSABLE: DIVISION DE CIENCIAS FISICO MATEMATICAS Y LAS INGENIERIAS - 0
                </div>
            </div>
        </div>
    
    
    
        <div class="tableContainer align-self-center">
            <SubjectTable {subject} />
        </div>
    

        <div class="footer align-self-end">
            <div class="d-flex justify-content-center">
                <div>Nezahualcóyotl, Estado de México, a 23 de Noviembre del 2023</div>
                <div><strong> "POR MI RAZA HABLARÁ EL ESPÍRITU"</strong></div>
            </div>
    
            <br />
            <br />
    
            <div class="d-flex justify-content-between">
                <div class="">
                    <div class="d-flex justify-content-center">CONFORMIDAD INTERESADO(A)</div>
    
                    <br />
                    <br />
                    <br />
    
                    <div class="d-flex justify-content-center">________________________________________________</div>
    
                    <div class="d-flex justify-content-center">ABURTO CAMACHO BLANCA PAMELA</div>
                </div>
    
                <div class="">
                    <div class="d-flex justify-content-center">JEFE DE CARRERA</div>
    
                    <br />
                    <br />
                    <br />
    
                    <div class="d-flex justify-content-center">________________________________________________</div>
    
                    <div class="d-flex justify-content-center">ING. JORGE ARTURO LOPEZ HERNANDEZ</div>
                </div>
    
                <div class="">
                    <div class="d-flex justify-content-center">SELLO Y FIRMA DE RECIBIDO</div>
    
                    <br />
                    <br />
                    <br />
    
                    <div class="d-flex justify-content-center">________________________________________________</div>
    
                    <div class="d-flex justify-content-center">DEPTO. DE RECURSOS HUMANOS</div>
                </div>
            </div>
        </div>
    </div>

</div>

<style>
	.contenedorCarta {
		height: 8.5in; /* Ancho de una hoja carta */
		width: 11in; /* Alto de una hoja carta */
		border: 1px solid #b6b6b6;
        padding: 32px;
	}

	.tableCareer {
		font-size: 12px;
	}

	.blue-border {
		border: 2px solid #aacfd3;
	}

	.docHeader {
		text-align: center;
		font-size: 16px;
		font-weight: bold;
	}

	.footer {
		font-size: 12px;
	}
</style>
