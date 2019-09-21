// positive sound for birthday greeting from Alexa Sound Library
// https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html
const POSITIVE_SOUND = `<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>`;
// congratulations greeting (speechcon)
// https://developer.amazon.com/docs/custom-skills/speechcon-reference-interjections-spanish.html
const GREETING_SPEECHCON = `<say-as interpret-as="interjection">felicidades</say-as>`;
const DOUBT_SPEECHCON = `<say-as interpret-as="interjection">hmm</say-as>`;

module.exports = {
    es: {
        translation: {
            films: 'Películas',
            sports: 'Deportes',
             GAME_START: ['¡Vamos a empezar! <audio src="soundbank://soundlibrary/vehicles/horns_honks/horns_14"/> El tema es {{trasnlatedTopic}}. Empiezo yo, voy a ir de camping y voy a llevar... {{firstWord}}',
                '¡Vamos allá! Cargamos sólo lo imprescindible, ok? <audio src="soundbank://soundlibrary/alarms/back_up_beeps/back_up_beeps_03"/> El tema es {{trasnlatedTopic}}. Voy a ir de camping y voy a llevar... {{firstWord}}',
                '<say-as interpret-as="interjection">¡Dale manolo!</say-as> El tema es {{trasnlatedTopic}}. Empiezo yo: Voy a ir de camping y voy a llevar... {{firstWord}}' ],
            GAME_STEP_OK_MSG: ['¡Muy bien! <say-as interpret-as="interjection">siguiente</say-as>', 
                '<say-as interpret-as="interjection">vale vale</say-as> eso te lo llevas, dime otra', 
                '<say-as interpret-as="interjection">me gusta</say-as> nos lo llevamos, dime más',
                '<say-as interpret-as="interjection">venga pa dentro</say-as>, me vale',
                '¡vale! puede ser útil'],
            GAME_STEP_NOK_MSG: ['<say-as interpret-as="interjection">buuu buuu	</say-as>, con eso no puedes venir de camping conmigo',
                '<say-as interpret-as="interjection">¿cómorr?</say-as>, ni de coña, piensa en otra cosa',
                '<say-as interpret-as="interjection">¿ein?</say-as>, ¿Y para qué quieres eso?',
                '<say-as interpret-as="interjection">uups</say-as> eso mejor lo dejamos en casa',
                '<say-as interpret-as="interjection">sí claro</say-as> ¿Y dónde metemos eso?',
                '<say-as interpret-as="interjection">ay ay ay</say-as> tú no sabes cómo se juega esto, ¿verdad?',
                '<audio src="soundbank://soundlibrary/alarms/beeps_and_bloops/buzz_02"/> no queremos llevar eso, <emphasis level="strong">créeme</emphasis>',
                '<audio src="soundbank://soundlibrary/hospital/heartbeats_ekg/heartbeats_ekg_02"/> me has matao <say-as interpret-as="interjection">¿pero para qué quieres eso?</say-as>'
                
            ],
            WELCOME_MSG: ['<say-as interpret-as="interjection">¡Jelous!</say-as>, si ya sabes jugar puedes decir empezar, si no ... <amazon:effect name="whispered">pues haber estudiado</amazon:effect>... digooo, di ayuda' ],
            WELCOME_BACK_MSG: ['<say-as interpret-as="interjection">¡Hola caracola!</say-as> tienes una partida empezada, puedes continuarla o empezar una nueva' ],
            GAME_END: ['<say-as interpret-as="interjection">ole has ganado.</say-as> La solución era: {{secretWord}}. Di empezar si quieres volver a jugar.'
            
            ],
            ERROR_MSG: ['Algo rarito ha sucedido... ¿y si pruebas otra vez?',
            ],
            CONTINUE_GAME:['Vale, el tema era {{topic}} y las palabras que llevabas eran {{wordList}}. Recuerda, que vas de camping y me tienes que decir que vas a llevar'],
            HELP_MSG: ['A ver que te explico. El juego consiste en adivinar la palabra secreta. Te diré un tema y la primera palabra como pista. Cómo se relaciona con la palabra secreta corre de tu cuenta! Para jugar tienes que decir "Voy de camping y me voy a llevar"... y la palabra que tú quieras'],
            BYE_MSG: ['Chau pescau','<say-as interpret-as="interjection">¡Hasta ahorita!/say-as>' ],
        
    
            DAYS_LEFT_MSG: '{{name}} Queda {{count}} día ',
            DAYS_LEFT_MSG_plural: '{{name}} Quedan {{count}} días ',
            WILL_TURN_MSG: 'para que cumplas {{count}} año. ',
            WILL_TURN_MSG_plural: 'para que cumplas {{count}} años. ',
            GREET_MSG: POSITIVE_SOUND + GREETING_SPEECHCON + ' {{name}} ',
            NOW_TURN_MSG: 'Hoy cumples {{count}} año! ',
            NOW_TURN_MSG_plural: 'Hoy cumples {{count}} años! ',
            MISSING_MSG: DOUBT_SPEECHCON + '. Parece que aun no me has dicho tu fecha de cumpleaños. ',
            SHORT_HELP_MSG: 'Dime que otra cosa quieres hacer o solo dí, ayuda, si no estas seguro, o, para, si quieres salir. ',
            GOODBYE_MSG: ['Hasta luego {{name}}! ', 'Adios {{name}}! ', 'Hasta pronto {{name}}! ', 'Nos vemos {{name}}! '],
            REFLECTOR_MSG: 'Acabas de activar {{intent}}',
            FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez. ',
            NO_TIMEZONE_MSG: 'No he podido determinar tu zona horaria. Verifica la configuración de tu dispositivo e inténtalo otra vez.',
            REMINDER_CREATED_MSG: 'El recordatorio se ha creado con éxito. ',
            REMINDER_ERROR_MSG: 'Ha habido un error al crear el recordatorio. ',
            UNSUPPORTED_DEVICE_MSG: 'Este dispositivo no soporta la operación que estás intentando realizar. ',
            CANCEL_MSG: 'Vale. Lo cancelamos. ',
            MISSING_PERMISSION_MSG: 'Parece que no has autorizado el envío de recordatorios. Te he enviado una tarjeta a la app Alexa para que lo habilites. ',
            API_ERROR_MSG: 'Lo siento, ha habido un problema de acceso a la API externa. Por favor inténtalo otra vez. ',
            PROGRESSIVE_MSG: 'Déjame ver quién cumple hoy. ',
            CONJUNCTION_MSG: ' y ',
            CELEBRITY_BIRTHDAYS_MSG: 'En esta fecha cumplen años: ',
            ALSO_TODAY_MSG: 'También hoy cumplen: ',
            DELETE_MSG: 'Todas las actividades han sido eliminadas',
            ACTIVITY_LIST_MSG: 'Los {{dayofweekName}} tienes ',
            ACTIVITY_LIST_EMPTY_MSG: 'No tienes actividades los {{dayofweekName}}',
            ACTIVITY_INFO_MSG: '{{activity}} de {{starttime}} a {{endtime}}',
            DAY_OF_WEEK_1: 'Lunes',
            DAY_OF_WEEK_2: 'Martes',
            DAY_OF_WEEK_3: 'Miércoles',
            DAY_OF_WEEK_4: 'Jueves',
            DAY_OF_WEEK_5: 'Viernes',
            DAY_OF_WEEK_6: 'Sábados',
            DAY_OF_WEEK_7: 'Domingos'
        }
    }
}