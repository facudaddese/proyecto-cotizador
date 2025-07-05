const btnCotizacion = document.getElementById("btn-cotizacion");
const btnContacto = document.getElementById("btn-contacto");
const dudas = document.querySelectorAll(".flex-item");
const guias = document.querySelectorAll(".btn-guia");
const form = document.getElementById("form");

function mostrarCotizacion() {
    Swal.fire({
        title: 'Cotización rápida',
        html:
            `
                <input id="nombre" class="swal2-input" placeholder="Nombre Completo">
                <input id="edad" type="number" class="swal2-input" placeholder="Edad">
                <input id="localidad" class="swal2-input" placeholder="Localidad (GBA o CABA)">
                <input id="marca" class="swal2-input" placeholder="Marca">
                <input id="modelo" class="swal2-input" placeholder="Modelo">
                <input id="anio" type="number" class="swal2-input" placeholder="Año">
            `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            const nombre = document.getElementById('nombre').value.trim();
            const edad = parseInt(document.getElementById('edad').value.trim());
            const localidad = document.getElementById('localidad').value.trim().toLowerCase();
            const marca = document.getElementById('marca').value.trim();
            const modelo = document.getElementById('modelo').value.trim();
            const anio = parseInt(document.getElementById('anio').value.trim());

            if (!nombre || !edad || !localidad || !marca || !modelo || !anio) {
                Swal.showValidationMessage('Completá todos los campos');
                return false;
            }

            return { nombre, edad, localidad, marca, modelo, anio };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nombre, edad, localidad, marca, modelo, anio } = result.value;

            const precioBase = 100000;
            const factorEdad = edad < 25 ? 1.3 : edad > 60 ? 1.2 : 1;
            const factorAnio = anio > 2020 ? 1.3 : anio > 2010 ? 1.1 : 0.9;
            const factorZona = localidad.includes("caba") ? 1.2 :
                localidad.includes("gba") ? 1.1 : 1;
            const cotizacion = Math.round(precioBase * factorEdad * factorAnio * factorZona);

            Swal.fire({
                title: 'Cotización estimada',
                html:
                    `
                    <p><strong>${nombre}</strong>, tu seguro estimado es:</p>
                    <p style="font-size: 1.8em; font-weight: bold;">$${cotizacion.toLocaleString()}</p>
                    <p style="font-size: 0.9em;">(Este es un valor aproximado según tus datos)</p>
                `,
                icon: 'success'
            });
        }
    });
}

btnCotizacion.addEventListener("click", mostrarCotizacion);
form.addEventListener("click", mostrarCotizacion);

function mostrarContacto() {
    Swal.fire({
        title: '<h3>Nuestros canales de atención</h3>',
        html: `
            <p style="margin: 22px 0;">Nuestro horario de atención es de lunes a viernes de 09 a 18 hs</p>
            <div>
                <h3>Central telefónica</h3>
                <p style="padding: 10px;">4141-7976</p>
            </div>
            <div style="margin: 20px 0;">
                <h3>Grúa y emergencias 24h</h3>
                <p style="padding: 10px;">0800-999-1234</p>
            </div>
            <div>
                <h3>WhatsApp</h3>
                <p style="padding: 10px;">1122334455</p>
            </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: 700,
        padding: '2rem'
    });
}
btnContacto.addEventListener("click", mostrarContacto);

function mostrarModalEmergencias() {
    Swal.fire({
        title: '<h3>Emergencias</h3>',
        html: `
            <p style="margin: 22px 0;">Llamá a nuestro Servicio de Asistencia y Grúa las 24hs:</p>
            <p style="font-size: 1.4em; font-weight: bold;">0800-999-1234</p>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: 500,
        padding: '2rem'
    });
}
function mostrarModalSiniestros() {
    Swal.fire({
        title: '<h3>Siniestros</h3>',
        html: `
            <p style="margin: 22px 0;">Podés comunicarte por WhatsApp, de lunes a viernes de 9 a 18h.</p>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: 500,
        padding: '2rem'
    });
}
function mostrarModalPoliza() {
    Swal.fire({
        title: '<h3>Necesito mi póliza</h3>',
        html: `
            <p style="margin: 22px 0;">Accedé a tu documentación desde la App de Autogestión. Exclusivo para clientes con Seguro de Auto. Por otras pólizas, podés solicitarlas desde WhatsApp las 24h.</p>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: 500,
        padding: '2rem'
    });
}
function mostrarModalPreguntas() {
    Swal.fire({
        title: '<h3>Acá te dejamos lo mas buscado:</h3>',
        html: `
            <ul style="list-style: none;">
                <li>Cotizar vehículo.</li>
                <li>Siniestros.</li>
                <li>Servicios de grúa las 24h.</li>
            </ul>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: 500,
        padding: '2rem'
    });
}

dudas.forEach(duda => {
    duda.addEventListener("click", () => {
        if (duda === dudas[0]) {
            mostrarModalEmergencias();
        } else if (duda === dudas[1]) {
            mostrarModalSiniestros();
        } else if (duda === dudas[2]) {
            mostrarModalPoliza();
        } else {
            mostrarModalPreguntas();
        }
    })
});

function mostrarModalAccidente() {
    Swal.fire({
        title: '¿Tuviste un accidente?',
        width: '800px',
        html: `
            <ol style="text-align: left;">
                <li style="padding: 5px;"><strong>Mantené la calma</strong></li>
                <p style="margin-bottom:10px; padding-left: 5px;">Lo primero es verificar que todos estén bien. Si hay lesionados, llamá de inmediato a emergencias (911 en Argentina). Si es posible, mové los vehículos para no obstruir el tránsito, pero solo si ya tomaste fotos del lugar y los daños.</p>

                <li style="padding: 5px;"><strong>Documentá todo</strong></li>
                <p style="margin-bottom:10px; padding-left: 5px;">Sacá fotos de los daños, las patentes de los vehículos involucrados, y el lugar del accidente. Esta información será clave al momento de reportar el siniestro a tu aseguradora.<br><strong>¡IMPORTANTE!</strong> Intercambiá datos con el otro conductor: licencia de conducir, número de contacto y aseguradora. ¡También, anotá la patente y marca del vehículo!</p>

                <li style="padding: 5px;"><strong>Llamá a tu aseguradora</strong></li>
                <p style="margin-bottom:10px; padding-left: 5px;">Contactá de inmediato a tu aseguradora. Si contás con un Seguro para Autos como el de Answer, el proceso será más sencillo, ya que te guiaremos sobre cómo proceder y te brindaremos asistencia en el momento.</p>

                <li style="padding: 5px;"><strong>Hacé la denuncia del siniestro</strong></li>
                <p style="margin-bottom:10px; padding-left: 5px;">Recordá que tenés hasta 72 horas para hacer la denuncia del siniestro. Es importante que informes el accidente a tu aseguradora lo antes posible. Esto se puede hacer online, por teléfono o incluso desde una app, dependiendo de tu proveedor.</p>
            </ol>
        `,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#007bff'
    });
}
function mostrarModalPinchadura() {
    Swal.fire({
        title: '¿Pinchaste una rueda?',
        width: '800px',
        html: `
            <ol style="text-align: left;">
                <li style="padding: 5px;"><strong>Mantené la calma y estacioná en un lugar seguro</strong></li>
                <p style="margin-bottom:10px; padding-left: 5px;">Lo primero es evitar un accidente. Reducí la velocidad despacio, poné las balizas y buscá un lugar seguro para detenerte, como una banquina firme o un costado alejado del tránsito.<br><em>Tip:</em> Si estás en ruta, no olvides colocar los triángulos de seguridad a 30 metros del auto.</p>

                <li style="padding: 5px;"><strong>Sacá tu equipo y revisá el daño</strong></li>
                <p style="margin-bottom:10px; padding-left: 5px;">Abrí el baúl y buscá el gato hidráulico, la llave cruz y la rueda de auxilio. Antes de hacer nada, revisá la llanta. Si el pinchazo es pequeño, quizás podés inflar la rueda y llegar a una gomería cercana.<br><em>Tip canchero:</em> Siempre llevá un kit de reparación rápido, esos aerosoles que sellan pinchaduras al toque. ¡Salvan vidas!</p>

                <li style="padding: 5px;"><strong>Cambiá la rueda como un pro</strong></li>
                <p style="margin-bottom:10px; padding-left: 5px;">Ubicá el gato en el punto correcto del chasis, levantá el auto con cuidado, aflojá las tuercas y reemplazá la rueda. Ajustá bien las tuercas antes de bajar el auto. ¡Listo!</p>

                <li style="padding: 5px;"><strong>Consultá tu Seguro de auto</strong></li>
                <p style="margin-bottom:10px; padding-left: 5px;">¿No te animás a cambiar la rueda o estás en un lugar complicado? No pasa nada. Llamá a la asistencia de tu seguro.</p>

                <li style="padding: 5px;"><strong>¡No te olvides de reparar la rueda pinchada!</strong></li>
                <p style="margin-bottom:10px; padding-left: 5px;">La rueda de auxilio es solo una solución temporal. En cuanto puedas, llevá la llanta dañada a una gomería para repararla o reemplazarla si es necesario.</p>
            </ol>
        `,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#007bff'
    });
}
function mostrarModalKit() {
    Swal.fire({
        title: '¿Qué debe tener tu auto en caso de emergencia?',
        width: '800px',
        html: `
            <ol style="text-align: left;">
                <li style="padding: 5px;"><strong>Triángulos reflectantes y chaleco de seguridad</strong></li>
                // <p style="margin-bottom:10px; padding-left: 5px;">Son imprescindibles para que los demás conductores te vean en caso de que tu vehículo quede detenido. Colocá los triángulos a unos 30 metros del auto, esto ayudará a mejorar la visibilidad.</p>

                <li style="padding: 5px;"><strong>Linterna y pilas de repuesto</strong></li>
                // <p style="margin-bottom:10px; padding-left: 5px;">Una linterna potente y baterías extras son esenciales, especialmente si es de noche o un lugar poco iluminado. No importa si tu auto tiene luces de emergencia, una linterna te va a ayudar a ver mejor y a ser más visible.</p>

                <li style="padding: 5px;"><strong>Botiquín de primeros auxilios</strong></li>
                // <p style="margin-bottom:10px; padding-left: 5px;">Siempre es necesario tener un botiquín básico a mano. Debe contener gasas, vendas, alcohol, analgésicos y todo lo básico para atender cualquier herida o malestar. Es clave que revises regularmente su contenido y que los medicamentos no estén vencidos.</p>

                <li style="padding: 5px;"><strong>Cables de arranque</strong></li>
                // <p style="margin-bottom:10px; padding-left: 5px;">Si la batería de tu auto te juega una mala pasada, tener cables de arranque a mano te puede salvar. Si encontrás a otro conductor dispuesto a ayudar, vas a poder arrancar el auto sin mayores problemas.</p>

                <li style="padding: 5px;"><strong>Gato hidráulico, llave de cruz y llave de rueda</strong></li>
                // <p style="margin-bottom:10px; padding-left: 5px;">Si llegás a tener un pinchazo, no hay nada más importante que un buen gato hidráulico para levantar el auto de manera segura. Además, no te olvides de la llave de cruz para poder sacar las tuercas de las ruedas.</p>

                // <p style="margin-bottom:10px; padding-left: 5px;"><strong>Tip final:</strong> Tener un kit de emergencia completo en tu auto no solo te da tranquilidad, sino que también te puede salvar en situaciones críticas. Además, es clave contar con un buen Seguro de Auto que te cubra en caso de cualquier imprevisto en la ruta.</p>
            </ol>
        `,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#007bff'
    });
}

guias.forEach(guia => {
    guia.addEventListener("click", () => {
        if (guia === guias[0]) {
            mostrarModalAccidente();
        } else if (guia === guias[1]) {
            mostrarModalPinchadura();
        } else {
            mostrarModalKit();
        }
    })
});
