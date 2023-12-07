<script>
	export let subject;
	//console.log(subject);
</script>



<div class="table-responsive-sm">

    <table class="table ">
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
            <td>{subject.tipo}</td>
            <td>{subject.causa}</td>
            <td>{subject.categoria}</td>
            <td>{subject.Texto162}</td>
            <td>{subject.Texto168}</td>
            <td>{subject.Texto169}</td>
            <td>{subject.Texto170}</td>
            <td>{subject.Texto171}</td>
            <td>{subject.Texto172}</td>
            <td>{subject.Texto126}</td>
            <td>{subject.cveAsignatura}</td>
            <td>{subject.nombreAsignatura}</td>
            <td class="thCentrado">{subject.grupo}</td>
            <td class="thCentrado">{subject.horasTeoricas}</td>
            <td class="thCentrado">{subject.horasPracticas}</td>
            <td class="thCentrado">{subject.horasTotal}</td>
            <td class="thCentrado">{subject.horario}</td>
            <!--<td class="thCentrado">{subject.horario}Lu,Mi <br />17:00-18:30 <br />17:00-18:30</td>-->
            <td class="thCentrado">{subject.salon}</td>
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



<style>
    .table {
        /* Estilos de tu tabla aquí */
        border-collapse: collapse;
        font-size: 8px;
        width: 100%;
    }

    .table th, .table td {
        border: 2px solid #aacfd3;
        padding: 4px;
        text-align: center;
    }

    th {
        background-color: #96b5e4;
    }

    .thCentrado {
        text-align: center;
    }

    .filaTotales {
        background-color: #DEDEDE;
    }


    
</style>