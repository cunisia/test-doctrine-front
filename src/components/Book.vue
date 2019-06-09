<template>
    <div class="book">
        <h1 class="book__title">{{book.title}}</h1>
        <ul class="book__metas">
            <li v-if="book.author" class="book__meta book__meta--author">{{book.author}}</li>
            <li v-if="book.language" class="book__meta book__meta--language">{{book.language}}</li>
            <li v-if="book.subject" class="book__meta book__meta--subject">{{book.subject}}</li>
        </ul>
        <pre class="book__content" v-if="book.book" v-html="book.book"></pre>
    </div>
</template>

<script>
    import axios from 'axios/dist/axios.js'

    export default {
        name: 'Book',
        data: function() {
            return {
                book: {},
                loadingError: false
            }
        },
        props: {
            bookId: String
        },
        mounted() {
            this.book = {
                "author": "Hugo, Victor, 1802-1885",
                "title": "Les Misérables",
                "language": "English",
                "subject": "Ex-convicts -- Fiction",
                "id": "135",
                "downloads": "4751 downloads in the last 30 days.",
                "book": "\r\nLES MISÉRABLES\r\n\r\nBy Victor Hugo\r\n\r\nTranslated by Isabel F. Hapgood\r\n\r\n\r\nThomas Y. Crowell & Co. No. 13, Astor Place New York\r\n\r\nCopyright 1887\r\n\r\n\r\n\r\nEnlarge\r\n\r\n\r\nEnlarge\r\n\r\n\r\nEnlarge\r\n\r\n\r\nEnlarge\r\n\r\n\r\nEnlarge\r\n\r\n\r\nEnlarge\r\n\r\n\r\n\r\nContents\r\n\r\n\r\n\r\nLES MISÉRABLES\r\n\r\nVOLUME I.--FANTINE.\r\n\r\nPREFACE\r\n\r\n  BOOK FIRST--A JUST MAN\r\n  CHAPTER I--M. MYRIEL\r\n  CHAPTER II--M. MYRIEL BECOMES M. WELCOME\r\n  CHAPTER III--A HARD BISHOPRIC FOR A GOOD BISHOP\r\n  CHAPTER IV--WORKS CORRESPONDING TO WORDS\r\n  CHAPTER V--MONSEIGNEUR BIENVENU MADE HIS CASSOCKS LAST TOO LONG\r\n  CHAPTER VI--WHO GUARDED HIS HOUSE FOR HIM\r\n  CHAPTER VII--CRAVATTE\r\n  CHAPTER VIII--PHILOSOPHY AFTER DRINKING\r\n  CHAPTER IX--THE BROTHER AS DEPICTED BY THE SISTER\r\n  CHAPTER X--THE BISHOP IN THE PRESENCE OF AN UNKNOWN LIGHT\r\n  CHAPTER XI--A RESTRICTION\r\n  CHAPTER XII--THE SOLITUDE OF MONSEIGNEUR WELCOME\r\n  CHAPTER XIII--WHAT HE BELIEVED\r\n  CHAPTER XIV--WHAT HE THOUGHT\r\n\r\n  BOOK SECOND--THE FALL\r\n  CHAPTER I--THE EVENING OF A DAY OF WALKING\r\n  CHAPTER II--PRUDENCE COUNSELLED TO WISDOM.\r\n  CHAPTER III--THE HEROISM OF PASSIVE OBEDIENCE.\r\n  CHAPTER IV--DETAILS CONCERNING THE CHEESE-DAIRIES OF PONTARLIER.\r\n  CHAPTER V--TRANQUILLITY\r\n  CHAPTER VI--JEAN VALJEAN\r\n  CHAPTER VII--THE INTERIOR OF DESPAIR\r\n  CHAPTER VIII--BILLOWS AND SHADOWS\r\n  CHAPTER IX--NEW TROUBLES\r\n  CHAPTER X--THE MAN AROUSED\r\n  CHAPTER XI--WHAT HE DOES\r\n  CHAPTER XII--THE BISHOP WORKS\r\n  CHAPTER XIII--LITTLE GERVAIS\r\n\r\n  BOOK THIRD.--IN THE YEAR 1817\r\n  CHAPTER I--THE YEAR 1817\r\n  CHAPTER II--A DOUBLE QUARTETTE\r\n  CHAPTER III--FOUR AND FOUR\r\n  CHAPTER IV--THOLOMYÈS IS SO MERRY THAT HE SINGS A SPANISH DITTY\r\n  CHAPTER V--AT BOMBARDA'S\r\n  CHAPTER VI--A CHAPTER IN WHICH THEY ADORE EACH OTHER\r\n  CHAPTER VII--THE WISDOM OF THOLOMYÈS\r\n  CHAPTER VIII--THE DEATH OF A HORSE\r\n  CHAPTER IX--A MERRY END TO MIRTH\r\n\r\n  BOOK FOURTH.--TO CONFIDE IS SOMETIMES TO DELIVER INTO A PERSON'S POWER\r\n  CHAPTER I--ONE MOTHER MEETS ANOTHER MOTHER\r\n  CHAPTER II--FIRST SKETCH OF TWO UNPREPOSSESSING FIGURES\r\n  CHAPTER III--THE LARK\r\n\r\n  BOOK FIFTH.--THE DESCENT.\r\n  CHAPTER I--THE HISTORY OF A PROGRESS IN BLACK GLASS TRINKETS\r\n  CHAPTER II--MADELEINE\r\n  CHAPTER III--SUMS DEPOSITED WITH LAFFITTE\r\n  CHAPTER IV--M. MADELEINE IN MOURNING\r\n  CHAPTER V--VAGUE FLASHES ON THE HORIZON\r\n  CHAPTER VI--FATHER FAUCHELEVENT\r\n  CHAPTER VII--FAUCHELEVENT BECOMES A GARDENER IN PARIS\r\n  CHAPTER VIII--MADAME VICTURNIEN EXPENDS THIRTY FRANCS ON MORALITY\r\n  CHAPTER IX--MADAME VICTURNIEN'S SUCCESS\r\n  CHAPTER X--RESULT OF THE SUCCESS\r\n  CHAPTER XI--CHRISTUS NOS LIBERAVIT\r\n  CHAPTER XII--M. BAMATABOIS'S INACTIVITY\r\n  CHAPTER XIII--THE SOLUTION OF SOME QUESTIONS CONNECTED WITH THE MUNICIPAL POLICE\r\n\r\n  BOOK SIXTH.--JAVERT\r\n  CHAPTER I--THE BEGINNING OF REPOSE\r\n  CHAPTER II--HOW JEAN MAY BECOME CHAMP\r\n\r\n  BOOK SEVENTH.--THE CHAMPMATHIEU AFFAIR\r\n  CHAPTER I--SISTER SIMPLICE\r\n  CHAPTER II--THE PERSPICACITY OF MASTER SCAUFFLAIRE\r\n  CHAPTER III--A TEMPEST IN A SKULL\r\n  CHAPTER IV--FORMS ASSUMED BY SUFFERING DURING SLEEP\r\n  CHAPTER V--HINDRANCES\r\n  CHAPTER VI--SISTER SIMPLICE PUT TO THE PROOF\r\n  CHAPTER VII--THE TRAVELLER ON HIS ARRIVAL TAKES PRECAUTIONS FOR DEPARTURE\r\n  CHAPTER VIII--AN ENTRANCE BY FAVOR\r\n  CHAPTER IX--A PLACE WHERE CONVICTIONS ARE IN PROCESS OF FORMATION\r\n  CHAPTER X--THE SYSTEM OF DENIALS\r\n  CHAPTER XI--CHAMPMATHIEU MORE AND MORE ASTONISHED\r\n\r\n  BOOK EIGHTH.--A COUNTER-BLOW\r\n  CHAPTER I--IN WHAT MIRROR M. MADELEINE CONTEMPLATES HIS HAIR\r\n  CHAPTER II--FANTINE HAPPY\r\n  CHAPTER III--JAVERT SATISFIED\r\n  CHAPTER IV--AUTHORITY REASSERTS ITS RIGHTS\r\n  CHAPTER V--A SUITABLE TOMB\r\n\r\n\r\n\r\n  VOLUME II.--COSETTE\r\n\r\n  BOOK FIRST.--WATERLOO\r\n  CHAPTER I--WHAT IS MET WITH ON THE WAY FROM NIVELLES\r\n  CHAPTER II--HOUGOMONT\r\n  CHAPTER III--THE EIGHTEENTH OF JUNE, 1815\r\n  CHAPTER IV--A\r\n  CHAPTER V--THE QUID OBSCURUM OF BATTLES\r\n  CHAPTER VI--FOUR O'CLOCK IN THE AFTERNOON\r\n  CHAPTER VII--NAPOLEON IN A GOOD HUMOR\r\n  CHAPTER VIII--THE EMPEROR PUTS A QUESTION TO THE GUIDE LACOSTE\r\n  CHAPTER IX--THE UNEXPECTED\r\n  CHAPTER X--THE PLATEAU OF MONT-SAINT-JEAN\r\n  CHAPTER XI--A BAD GUIDE TO NAPOLEON; A GOOD GUIDE TO BULOW\r\n  CHAPTER XII--THE GUARD\r\n  CHAPTER XIII--THE CATASTROPHE\r\n  CHAPTER XIV--THE LAST SQUARE\r\n  CHAPTER XV--CAMBRONNE\r\n  CHAPTER XVI--QUOT LIBRAS IN DUCE?\r\n  CHAPTER XVII--IS WATERLOO TO BE CONSIDERED GOOD?\r\n  CHAPTER XVIII--A RECRUDESCENCE OF DIVINE RIGHT\r\n  CHAPTER XIX--THE BATTLE-FIELD AT NIGHT\r\n\r\n\r\n  BOOK SECOND.--THE SHIP ORION\r\n  CHAPTER I--NUMBER 24,601 BECOMES NUMBER 9,430\r\n  CHAPTER II--IN WHICH THE READER WILL PERUSE TWO VERSES, WHICH ARE OF THE\r\n       DEVIL'S COMPOSITION, POSSIBLY\r\n  CHAPTER III--THE ANKLE-CHAIN MUST HAVE UNDERGONE A CERTAIN PREPARATORY\r\n       MANIPULATION TO BE THUS BROKEN WITH A BLOW FROM A HAMMER\r\n\r\n  BOOK THIRD.--ACCOMPLISHMENT OF THE PROMISE MADE TO THE DEAD WOMAN\r\n  CHAPTER I--THE WATER QUESTION AT MONTFERMEIL\r\n  CHAPTER II--TWO COMPLETE PORTRAITS\r\n  CHAPTER III--MEN MUST HAVE WINE, AND HORSES MUST HAVE WATER\r\n  CHAPTER IV--ENTRANCE ON THE SCENE OF A DOLL\r\n  CHAPTER V--THE LITTLE ONE ALL ALONE\r\n  CHAPTER VI--WHICH POSSIBLY PROVES BOULATRUELLE'S INTELLIGENCE\r\n  CHAPTER VII--COSETTE SIDE BY SIDE WITH THE STRANGER IN THE DARK\r\n  CHAPTER VIII--THE UNPLEASANTNESS OF RECEIVING INTO ONE'S HOUSE A POOR MAN\r\n       WHO MAY BE A RICH MAN\r\n  CHAPTER IX--THÉNARDIER AND HIS MANOUVRES\r\n  CHAPTER X--HE WHO SEEKS TO BETTER HIMSELF MAY RENDER HIS SITUATION WORSE\r\n  CHAPTER XI--NUMBER 9,430 REAPPEARS, AND COSETTE WINS IT IN THE LOTTERY\r\n\r\n  BOOK FOURTH.--THE GORBEAU HOVEL\r\n  CHAPTER I--MASTER GORBEAU\r\n  CHAPTER II--A NEST FOR OWL AND A WARBLER\r\n  CHAPTER III--TWO MISFORTUNES MAKE ONE PIECE OF GOOD FORTUNE\r\n  CHAPTER IV--THE REMARKS OF THE PRINCIPAL TENANT\r\n  CHAPTER V--A FIVE-FRANC PIECE FALLS ON THE GROUND AND PRODUCES A TUMULT\r\n\r\n  BOOK FIFTH.--FOR A BLACK HUNT, A MUTE PACK\r\n  CHAPTER I--THE ZIGZAGS OF STRATEGY\r\n  CHAPTER II--IT IS LUCKY THAT THE PONT D'AUSTERLITZ BEARS CARRIAGES\r\n  CHAPTER III--TO WIT, THE PLAN OF PARIS IN 1727\r\n  CHAPTER IV--THE GROPINGS OF FLIGHT\r\n  CHAPTER V--WHICH WOULD BE IMPOSSIBLE WITH GAS LANTERNS\r\n  CHAPTER VI--THE BEGINNING OF AN ENIGMA\r\n  CHAPTER VII--CONTINUATION OF THE ENIGMA\r\n  CHAPTER VIII--THE ENIGMA BECOMES DOUBLY MYSTERIOUS\r\n  CHAPTER IX--THE MAN WITH THE BELL\r\n  CHAPTER X--WHICH EXPLAINS H",
                "extract": "\r\nLES MISÉRABLES\r\n\r\nBy Victor Hugo\r\n\r\nTranslated by Isabel F. Hapgood\r\n\r\n\r\nThomas Y. Crowell & Co. No. 13, Astor Place New York\r\n\r\nCopyright 1887\r\n\r\n\r\n\r\nEnlarge\r\n\r\n\r\nEnlarge\r\n\r\n\r\nEnlarge\r\n\r\n\r\nEnlarge\r\n\r\n\r\nEnlarge\r\n\r\n\r\nEnlarge\r\n\r\n\r\n\r\nContents\r\n\r\n\r\n\r\nLES MISÉRABLES\r\n\r\nVOLUME I.--FANTINE.\r\n\r\nPREFACE\r\n\r\n  BOOK FIRST--A JUST MAN\r\n  CHAPTER I--M. MYRIEL\r\n  CHAPTER II--M. MYRIEL BECOMES M. WELCOME\r\n  CHAPTER III--A HARD BISHOPRIC FOR A GOOD BISHOP\r\n  CHAPTER IV--WORKS CORRESPONDING TO WORDS\r\n  CHAPTER V--MONSEIGNEUR BIENVENU MADE HIS CASSOCKS LAST TOO LONG\r\n  CHAPTER VI--WHO GUARDED HIS HOUSE FOR HIM\r\n  CHAPTER VII--CRAVATTE\r\n  CHAPTER VIII--PHILOSOPHY AFTER DRINKING\r\n  CHAPTER "
            };
            //TODO: create API service
//            axios.get('https://ljsv039eze.execute-api.eu-central-1.amazonaws.com/prod/book/' + this.bookId, {
//                'headers': {
//                    'x-api-key': 'yoHkF55Zjo1dQR7ichIhL92MV1kyA76O2pBMeukx'
//                }
//            }).then(
//                response => {
//                    this.result = response.data;
//                    this.loadingError = false;
//                },
//                () => {
//                    this.loadingError = true;
//                }
//            );
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    .book {
        max-width: 700px;
        margin: auto;
        text-align: left;
    }


    .book__title {
        font-size: 24px;
        display: block;
        font-weight: bold;
        color: #36b;
    }

    .book__metas {
        list-style-type: none;
        padding:0;
    }

    .book__meta {
        font-size: 15px;
        display: inline-block;
    }

    .book__meta:not(:first-child):before {
        content: '-';
        display: inline-block;
        margin: 0 5px;
    }

    .book__match {
        margin-top: 8px;
        font-size: 14px;
        color: #4c4c4c;
    }
</style>

<style>
    .book__match em {
        font-weight: bold;
    }
</style>
