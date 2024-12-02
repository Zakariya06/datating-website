/* eslint-disable max-len */

import { Link, Paper, Typography } from '@material-ui/core';
import React, { memo } from 'react';

import { AppbarComponent } from '../components/AppbarComponent';
import Footer from '../components/Footer';

//LINKS
const DATENSCHUTZ_GRUNDVERORDNUNG = 'https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=celex%3A32016R0679&tid=311160982';
const COOKIES_IN_CHROME_LOESCHEN = 'https://support.google.com/chrome/answer/95647?tid=311160982';
const COOKIES_IN_SAFARI_LOESCHEN = 'https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=311160982';
const COOKIES_IN_FIREFOX_LOESCHEN = 'https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=311160982';
const COOKIES_IN_INTERNET_EXPLORER_LOESCHEN =
    'https://support.microsoft.com/de-de/topic/l%C3%B6schen-und-verwalten-von-cookies-168dab11-0753-043d-7c16-ede5947fc64d';
const COOKIES_IN_EDGE_LOESCHEN =
    'https://support.microsoft.com/de-de/microsoft-edge/cookies-in-microsoft-edge-l%C3%B6schen-63947406-40ac-c3b8-57b9-2a946a29ae09';
const BUNDESBEAUFTRAGTE_FUER_DEN_DATENSCHUTZ = 'https://www.bfdi.bund.de/DE/Home/home_node.html';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ARTIKEL_25_Absatz_1_DSGVO = 'https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679&from=DE&tid=311160982';

export interface IDataProtectionPolicyPageProps {}

export const DataProtectionPolicyPage = memo((props: IDataProtectionPolicyPageProps) => {
    return (
        <>
            <AppbarComponent />
            <Paper
                style={{ paddingTop: 100, paddingBottom: 100, wordBreak: 'break-all' }}
                className="flex column align-items-center justify-content-center"
                elevation={0}
            >
                <div className="wrapper">
                    <Typography variant="h4">Datenschutzerklärung</Typography>
                    <br />
                    <br />
                    <Typography variant="h5">Datenschutz</Typography>

                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir haben diese Datenschutzerklärung (Fassung 11.03.2020-311160982) verfasst, um Ihnen gemäß der Vorgaben der{' '}
                        <Link rel="noopener" target="_blank" href={DATENSCHUTZ_GRUNDVERORDNUNG}>
                            Datenschutz-Grundverordnung (EU) 2016/679
                        </Link>{' '}
                        zu erklären, welche Informationen wir sammeln, wie wir Daten verwenden und welche Entscheidungsmöglichkeiten Sie als Besucher
                        dieser Webseite haben.
                        <br />
                        <br />
                        Leider liegt es in der Natur der Sache, dass diese Erklärungen sehr technisch klingen, wir haben uns bei der Erstellung jedoch
                        bemüht die wichtigsten Dinge so einfach und klar wie möglich zu beschreiben.
                    </Typography>
                    <br />

                    <Typography variant="h5">Cookies</Typography>
                    <br />

                    <Typography style={{ textAlign: 'justify' }}>
                        Unsere Website verwendet HTTP-Cookies um nutzerspezifische Daten zu speichern. Im Folgenden erklären wir, was Cookies sind und
                        warum Sie genutzt werden, damit Sie die folgende Datenschutzerklärung besser verstehen.
                    </Typography>
                    <br />

                    <Typography variant="h6">Was genau sind Cookies?</Typography>
                    <br />

                    <Typography style={{ textAlign: 'justify' }}>
                        Immer wenn Sie durch das Internet surfen, verwenden Sie einen Browser. Bekannte Browser sind beispielsweise Chrome, Safari,
                        Firefox, Internet Explorer und Microsoft Edge. Die meisten Webseiten speichern kleine Text-Dateien in Ihrem Browser. Diese
                        Dateien nennt man Cookies.
                        <br />
                        <br />
                        Eines ist nicht von der Hand zu weisen: Cookies sind echt nützliche Helferlein. Fast alle Webseiten verwenden Cookies. Genauer
                        gesprochen sind es HTTP-Cookies, da es auch noch andere Cookies für andere Anwendungsbereiche gibt. HTTP-Cookies sind kleine
                        Dateien, die von unserer Website auf Ihrem Computer gespeichert werden. Diese Cookie-Dateien werden automatisch im
                        Cookie-Ordner, quasi dem “Hirn” Ihres Browsers, untergebracht. Ein Cookie besteht aus einem Namen und einem Wert. Bei der
                        Definition eines Cookies müssen zusätzlich ein oder mehrere Attribute angegeben werden.
                        <br />
                        <br />
                        Cookies speichern gewisse Nutzerdaten von Ihnen, wie beispielsweise Sprache oder persönliche Seiteneinstellungen. Wenn Sie
                        unsere Seite wieder aufrufen, übermittelt Ihr Browser die „userbezogenen“ Informationen an unsere Seite zurück. Dank der
                        Cookies weiß unsere Website, wer Sie sind und bietet Ihnen Ihre gewohnte Standardeinstellung. In einigen Browsern hat jedes
                        Cookie eine eigene Datei, in anderen wie beispielsweise Firefox sind alle Cookies in einer einzigen Datei gespeichert.
                        <br />
                        <br />
                        Es gibt sowohl Erstanbieter Cookies als auch Drittanbieter-Cookies. Erstanbieter-Cookies werden direkt von unserer Seite
                        erstellt, Drittanbieter-Cookies werden von Partner-Webseiten (z.B. Google Analytics) erstellt. Jedes Cookie ist individuell zu
                        bewerten, da jedes Cookie andere Daten speichert. Auch die Ablaufzeit eines Cookies variiert von ein paar Minuten bis hin zu
                        ein paar Jahren. Cookies sind keine Software-Programme und enthalten keine Viren, Trojaner oder andere „Schädlinge“. Cookies
                        können auch nicht auf Informationen Ihres PCs zugreifen.
                        <br />
                        <br />
                        So können zum Beispiel Cookie-Daten aussehen:
                        <ul>
                            <li>Name: _ga</li>
                            <li>Ablaufzeit: 2 Jahre</li>
                            <li>Verwendung: Unterscheidung der Webseitenbesucher</li>
                            <li>Beispielhafter Wert: GA1.2.1326744211.152311160982</li>
                        </ul>
                        <br />
                        Ein Browser sollte folgende Mindestgrößen unterstützen:
                        <ul>
                            <li>Ein Cookie soll mindestens 4096 Bytes enthalten können</li>
                            <li>Pro Domain sollen mindestens 50 Cookies gespeichert werden können</li>
                            <li>Insgesamt sollen mindestens 3000 Cookies gespeichert werden können</li>
                        </ul>
                    </Typography>
                    <br />
                    <Typography variant="h6">Welche Arten von Cookies gibt es?</Typography>
                    <br />

                    <Typography style={{ textAlign: 'justify' }}>
                        Die Frage welche Cookies wir im Speziellen verwenden, hängt von den verwendeten Diensten ab und wird in der folgenden
                        Abschnitten der Datenschutzerklärung geklärt. An dieser Stelle möchten wir kurz auf die verschiedenen Arten von HTTP-Cookies
                        eingehen.
                        <br />
                        <br />
                        Man kann 4 Arten von Cookies unterscheiden:
                        <br />
                        <br />
                        <b>Unbedingt notwendige Cookies </b>
                        <br />
                        Diese Cookies sind nötig, um grundlegende Funktionen der Website sicherzustellen. Zum Beispiel braucht es diese Cookies, wenn
                        ein User ein Produkt in den Warenkorb legt, dann auf anderen Seiten weitersurft und später erst zur Kasse geht. Durch diese
                        Cookies wird der Warenkorb nicht gelöscht, selbst wenn der User sein Browserfenster schließt.
                        <br />
                        <br />
                        <b>Funktionelle Cookies</b>
                        <br />
                        Diese Cookies sammeln Infos über das Userverhalten und ob der User etwaige Fehlermeldungen bekommt. Zudem werden mithilfe
                        dieser Cookies auch die Ladezeit und das Verhalten der Website bei verschiedenen Browsern gemessen.
                        <br /> <br />
                        <b>Zielorientierte Cookies</b>
                        <br />
                        Diese Cookies sorgen für eine bessere Nutzerfreundlichkeit. Beispielsweise werden eingegebene Standorte, Schriftgrößen oder
                        Formulardaten gespeichert.
                        <br /> <br />
                        <b>Werbe-Cookies</b>
                        <br />
                        Diese Cookies werden auch Targeting-Cookies genannt. Sie dienen dazu dem User individuell angepasste Werbung zu liefern. Das
                        kann sehr praktisch, aber auch sehr nervig sein.
                        <br />
                        <br />
                        Üblicherweise werden Sie beim erstmaligen Besuch einer Webseite gefragt, welche dieser Cookiearten Sie zulassen möchten. Und
                        natürlich wird diese Entscheidung auch in einem Cookie gespeichert.
                    </Typography>
                    <br />

                    <Typography variant="h6">Wie kann ich Cookies löschen?</Typography>

                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wie und ob Sie Cookies verwenden wollen, entscheiden Sie selbst. Unabhängig von welchem Service oder welcher Website die
                        Cookies stammen, haben Sie immer die Möglichkeit Cookies zu löschen, nur teilweise zuzulassen oder zu deaktivieren. Zum
                        Beispiel können Sie Cookies von Drittanbietern blockieren, aber alle anderen Cookies zulassen.
                        <br />
                        <br />
                        Wenn Sie feststellen möchten, welche Cookies in Ihrem Browser gespeichert wurden, wenn Sie Cookie-Einstellungen ändern oder
                        löschen wollen, können Sie dies in Ihren Browser-Einstellungen finden:
                        <br /> <br />
                        <Link rel="noopener" target="_blank" href={COOKIES_IN_CHROME_LOESCHEN}>
                            Chrome: Cookies in Chrome löschen, aktivieren und verwalten
                        </Link>
                        <br />
                        <br />
                        <Link rel="noopener" target="_blank" href={COOKIES_IN_SAFARI_LOESCHEN}>
                            Safari: Verwalten von Cookies und Websitedaten mit Safari
                        </Link>
                        <br />
                        <br />
                        <Link rel="noopener" target="_blank" href={COOKIES_IN_FIREFOX_LOESCHEN}>
                            Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf Ihrem Computer abgelegt haben
                        </Link>
                        <br />
                        <br />
                        <Link rel="noopener" target="_blank" href={COOKIES_IN_INTERNET_EXPLORER_LOESCHEN}>
                            Internet Explorer: Löschen und Verwalten von Cookies
                        </Link>
                        <br />
                        <br />
                        <Link rel="noopener" target="_blank" href={COOKIES_IN_EDGE_LOESCHEN}>
                            Microsoft Edge : Löschen und Verwalten von Cookies
                        </Link>
                        <br />
                        <br />
                        Falls Sie grundsätzlich keine Cookies haben wollen, können Sie Ihren Browser so einrichten, dass er Sie immer informiert, wenn
                        ein Cookie gesetzt werden soll. So können Sie bei jedem einzelnen Cookie entscheiden, ob Sie das Cookie erlauben oder nicht.
                        Die Vorgangsweise ist je nach Browser verschieden. Am besten ist es Sie suchen die Anleitung in Google mit dem Suchbegriff
                        “Cookies löschen Chrome” oder “Cookies deaktivieren Chrome” im Falle eines Chrome Browsers oder tauschen das Wort “Chrome”
                        gegen den Namen Ihres Browsers, z.B. Edge, Firefox, Safari aus.
                    </Typography>
                    <br />

                    <Typography variant="h6">Wie sieht es mit meinem Datenschutz aus?</Typography>
                    <br />

                    <Typography style={{ textAlign: 'justify' }}>
                        Seit 2009 gibt es die sogenannten „Cookie-Richtlinien“. Darin ist festgehalten, dass das Speichern von Cookies eine
                        Einwilligung des Website-Besuchers (also von Ihnen) verlangt. Innerhalb der EU-Länder gibt es allerdings noch sehr
                        unterschiedliche Reaktionen auf diese Richtlinien. In Deutschland wurden die Cookie-Richtlinien nicht als nationales Recht
                        umgesetzt. Stattdessen erfolgte die Umsetzung dieser Richtlinie weitgehend in § 15 Abs.3 des Telemediengesetzes (TMG).
                        <br />
                    </Typography>
                    <br />

                    <Typography variant="h5">Speicherung persönlicher Daten</Typography>
                    <br />

                    <Typography style={{ textAlign: 'justify' }}>
                        Persönliche Daten, die Sie uns auf dieser Website elektronisch übermitteln, wie zum Beispiel Name, E-Mail-Adresse, Adresse
                        oder andere persönlichen Angaben im Rahmen der Übermittlung eines Formulars oder Kommentaren im Blog, werden von uns gemeinsam
                        mit dem Zeitpunkt und der IP-Adresse nur zum jeweils angegebenen Zweck verwendet, sicher verwahrt und nicht an Dritte
                        weitergegeben.
                        <br />
                        <br />
                        Wir nutzen Ihre persönlichen Daten somit nur für die Kommunikation mit jenen Besuchern, die Kontakt ausdrücklich wünschen und
                        für die Abwicklung der auf dieser Webseite angebotenen Dienstleistungen und Produkte. Wir geben Ihre persönlichen Daten ohne
                        Zustimmung nicht weiter, können jedoch nicht ausschließen, dass diese Daten beim Vorliegen von rechtswidrigem Verhalten
                        eingesehen werden.
                        <br />
                        <br />
                        Wenn Sie uns persönliche Daten per E-Mail schicken – somit abseits dieser Webseite – können wir keine sichere Übertragung und
                        den Schutz Ihrer Daten garantieren. Wir empfehlen Ihnen, vertrauliche Daten niemals unverschlüsselt per E-Mail zu übermitteln.
                        <br />
                        <br />
                        Die Rechtsgrundlage besteht nach Artikel 6 Absatz 1 a DSGVO (Rechtmäßigkeit der Verarbeitung) darin, dass Sie uns die
                        Einwilligung zur Verarbeitung der von Ihnen eingegebenen Daten geben. Sie können diesen Einwilligung jederzeit widerrufen –
                        eine formlose E-Mail reicht aus, Sie finden unsere Kontaktdaten im Impressum.
                    </Typography>
                    <br />

                    <Typography variant="h5">Rechte laut Datenschutzgrundverordnung</Typography>

                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Ihnen stehen laut den Bestimmungen der DSGVO grundsätzlich die folgende Rechte zu:
                        <ul>
                            <li>Recht auf Berichtigung (Artikel 16 DSGVO)</li>
                            <li>Recht auf Löschung („Recht auf Vergessenwerden“) (Artikel 17 DSGVO)</li>
                            <li>Recht auf Einschränkung der Verarbeitung (Artikel 18 DSGVO)</li>
                            <li>
                                Recht auf Benachrichtigung – Mitteilungspflicht im Zusammenhang mit der Berichtigung oder Löschung personenbezogener
                                Daten oder der Einschränkung der Verarbeitung (Artikel 19 DSGVO)
                            </li>
                            <li>Recht auf Datenübertragbarkeit (Artikel 20 DSGVO)</li>
                            <li>Widerspruchsrecht (Artikel 21 DSGVO)</li>
                            <li>
                                Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung — einschließlich Profiling — beruhenden
                                Entscheidung unterworfen zu werden (Artikel 22 DSGVO)
                            </li>
                        </ul>
                        Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen
                        Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich an die{' '}
                        <Link rel="noopener" target="_blank" href={BUNDESBEAUFTRAGTE_FUER_DEN_DATENSCHUTZ}>
                            Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI)
                        </Link>{' '}
                        wenden.
                    </Typography>
                    <br />

                    <Typography variant="h5">Auswertung des Besucherverhaltens</Typography>

                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        In der folgenden Datenschutzerklärung informieren wir Sie darüber, ob und wie wir Daten Ihres Besuchs dieser Website
                        auswerten. Die Auswertung der gesammelten Daten erfolgt in der Regel anonym und wir können von Ihrem Verhalten auf dieser
                        Website nicht auf Ihre Person schließen.
                        <br />
                        <br />
                        Mehr über Möglichkeiten dieser Auswertung der Besuchsdaten zu widersprechen erfahren Sie in der folgenden
                        Datenschutzerklärung.
                    </Typography>
                    <br />

                    <Typography variant="h5">TLS-Verschlüsselung mit https</Typography>

                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir verwenden https um Daten abhörsicher im Internet zu übertragen (Datenschutz durch Technikgestaltung{' '}
                        <Link rel="noopener" target="_blank" href={ARTIKEL_25_Absatz_1_DSGVO}>
                            Artikel 25 Absatz 1 DSGVO
                        </Link>
                        ). Durch den Einsatz von TLS (Transport Layer Security), einem Verschlüsselungsprotokoll zur sicheren Datenübertragung im
                        Internet können wir den Schutz vertraulicher Daten sicherstellen. Sie erkennen die Benutzung dieser Absicherung der
                        Datenübertragung am kleinen Schloßsymbol links oben im Browser und der Verwendung des Schemas https (anstatt http) als Teil
                        unserer Internetadresse.
                    </Typography>
                    <br />
                    <Typography variant="h6">Google Maps Datenschutzerklärung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir benützen auf unserer Website Google Maps der Firma Google Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA).
                        Mit Google Maps können wir Standorte visuell besser darstellen und damit unser Service verbessern. Durch die Verwendung von
                        Google Maps werden Daten an Google übertragen und auf den Google-Servern gespeichert. Hier wollen wir nun genauer darauf
                        eingehen, was Google Maps ist, warum wir diesen Google-Dienst in Anspruch nehmen, welche Daten gespeichert werden und wie Sie
                        dies unterbinden können.
                    </Typography>
                    <br />
                    <Typography variant="h5">Was ist Google Maps?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google Maps ist ein Online-Kartendienst der Firma Google Inc. Mit Google Maps können Sie im Internet über einen PC oder über
                        eine App genaue Standorte von Städten, Sehenswürdigkeiten, Unterkünften oder Unternehmen suchen. Wenn Unternehmen auf Google
                        My Business vertreten sind, werden neben dem Standort noch weitere Informationen über die Firma angezeigt. Um die
                        Anfahrtsmöglichkeit anzuzeigen, können Kartenausschnitte eines Standorts per HTML-Code in eine Website eingebunden werden.
                        Google Maps zeigt die Erdoberfläche als Straßenkarte oder als Luft- bzw. Satellitenbild an. Dank der Street View Bilder und
                        den qualitativ hochwertigen Satellitenbildern sind sehr genaue Darstellungen möglich.
                    </Typography>
                    <br />
                    <Typography variant="h5">Warum verwenden wir Google Maps auf unserer Website?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        All unsere Bemühungen auf dieser Seite verfolgen das Ziel, Ihnen eine nützliche und sinnvolle Zeit auf unserer Website zu
                        bieten. Durch die Einbindung von Google Maps können wir Ihnen die wichtigsten Informationen zu diversen Standorten liefern.
                        Dank Google Maps sehen Sie auf einen Blick wo wir unseren Firmensitz haben. Die Wegbeschreibung zeigt Ihnen immer den besten
                        bzw. schnellsten Weg zu uns. Sie können den Anfahrtsweg für Routen mit dem Auto, mit öffentlichen Verkehrsmitteln, zu Fuß oder
                        mit dem Fahrrad abrufen. Für uns ist die Bereitstellung von Google Maps Teil unseres Kundenservice.
                    </Typography>
                    <br />
                    <Typography variant="h5">Welche Daten werden von Google Maps gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Damit Google Maps ihren Dienst vollständig anbieten kann, muss das Unternehmen Daten von Ihnen aufnehmen und speichern. Dazu
                        zählen unter anderem die eingegebenen Suchbegriffe, Ihre IP-Adresse und die Breiten- bzw. Längenkoordinaten. Benutzen Sie die
                        Routenplaner-Funktion wird auch die eingegebene Startadresse gespeichert. Diese Datenspeicherung passiert allerdings auf den
                        Webseiten von Google Maps. Wir können Sie darüber nur informieren, aber keinen Einfluss nehmen. Da wir Google Maps in unsere
                        Website eingebunden haben, setzt Google mindestens ein Cookie (Name: NID) in Ihrem Browser. Dieses Cookie speichert Daten über
                        Ihr Userverhalten. Google nutzt diese Daten in erster Linie, um eigene Dienste zu optimieren und individuelle, personalisierte
                        Werbung für Sie bereitzustellen.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Folgendes Cookie wird aufgrund der Einbindung von Google Maps in Ihrem Browser gesetzt:
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <ul>
                            <li>
                                <b>Name:</b> NID
                            </li>
                            <li>
                                <b>Ablaufzeit:</b> nach 6 Monaten
                            </li>
                            <li>
                                <b>Verwendung:</b> NID wird von Google verwendet, um Werbeanzeigen an Ihre Google-Suche anzupassen. Mit Hilfe des
                                Cookies „erinnert“ sich Google an Ihre am häufigsten eingegebenen Suchanfragen oder Ihre frühere Interaktion mit
                                Anzeigen. So bekommen Sie immer maßgeschneiderte Werbeanzeigen. Das Cookie enthält eine einzigartige ID, die Google
                                benutzt, persönliche Einstellungen des Users für Werbezwecke zu sammeln.
                            </li>
                            <li>
                                <b>Beispielwert:</b> 188=h26c1Ktha7fCQTx8rXgLyATyITJ311160982
                            </li>
                        </ul>
                    </Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Anmerkung:</b> Wir können bei den Angaben der gespeicherten Daten keine Vollständigkeit gewährleisten. Speziell bei der
                        Verwendung von Cookies sind Veränderungen bei Google nie auszuschließen. Um das Cookie NID zu identifizieren, wurde eine
                        eigene Testseite angelegt, wo ausschließlich Google Maps eingebunden war.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie lange und wo werden die Daten gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Die Google-Server stehen in Rechenzentren auf der ganzen Welt. Die meisten Server befinden sich allerdings in Amerika. Aus
                        diesem Grund werden Ihre Daten auch vermehrt in den USA gespeichert. Hier können Sie genau nachlesen wo sich die
                        Google-Rechenzentren befinden:{' '}
                        <Link href="https://www.google.com/about/datacenters/inside/locations/?hl=de" target="_blank" rel="noopener">
                            https://www.google.com/about/datacenters/inside/locations/?hl=de
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Die Daten verteilt Google auf verschiedenen Datenträgern. Dadurch sind die Daten schneller abrufbar und werden vor etwaigen
                        Manipulationsversuchen besser geschützt. Jedes Rechenzentrum hat auch spezielle Notfallprogramme. Wenn es zum Beispiel
                        Probleme bei der Google-Hardware gibt oder eine Naturkatastrophe die Server beeinträchtigt, bleiben die Daten mit hoher
                        Wahrscheinlich dennoch geschützt.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Manche Daten speichert Google für einen festgelegten Zeitraum. Bei anderen Daten bietet Google lediglich die Möglichkeit,
                        diese manuell zu löschen. Weiters anonymisiert das Unternehmen auch Informationen (wie zum Beispiel Werbedaten) in
                        Serverprotokollen, indem sie einen Teil der IP-Adresse und Cookie-Informationen nach 9 bzw.18 Monaten löschen.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Mit der 2019 eingeführten automatischen Löschfunktion von Standort- und Aktivitätsdaten werden Informationen zur
                        Standortbestimmung und Web-/App-Aktivität &#8211; abhängig von Ihrer Entscheidung &#8211; entweder 3 oder 18 Monate
                        gespeichert und dann gelöscht. Zudem kann man diese Daten über das Google-Konto auch jederzeit manuell aus dem Verlauf
                        löschen. Wenn Sie Ihre Standorterfassung vollständig verhindern wollen, müssen Sie im Google-Konto die Rubrik „Web- und
                        App-Aktivität“ pausieren. Klicken Sie „Daten und Personalisierung“ und dann auf die Option „Aktivitätseinstellung“. Hier
                        können Sie die Aktivitäten ein- bzw. ausschalten.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        In Ihrem Browser können Sie weiters auch einzelne Cookies deaktivieren, löschen oder verwalten. Je nach dem welchen Browser
                        Sie verwenden, funktioniert dies auf unterschiedliche Art und Weise. Die folgenden Anleitungen zeigen, wie Sie Cookies in
                        Ihrem Browser verwalten:
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link href="https://support.google.com/chrome/answer/95647?tid=311160982" target="_blank" rel="noopener">
                            Chrome: Cookies in Chrome löschen, aktivieren und verwalten
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link href="https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=311160982" target="_blank" rel="noopener">
                            Safari: Verwalten von Cookies und Websitedaten mit Safari
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf Ihrem Computer abgelegt haben
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Internet Explorer: Löschen und Verwalten von Cookies
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Microsoft Edge: Löschen und Verwalten von Cookies
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Falls Sie grundsätzlich keine Cookies haben wollen, können Sie Ihren Browser so einrichten, dass er Sie immer informiert, wenn
                        ein Cookie gesetzt werden soll. So können Sie bei jedem einzelnen Cookie entscheiden, ob Sie es erlauben oder nicht.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google ist aktiver Teilnehmer beim EU-U.S. Privacy Shield Framework, wodurch der korrekte und sichere Datentransfer
                        persönlicher Daten geregelt wird. Mehr Informationen dazu finden Sie auf{' '}
                        <Link href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI" target="_blank" rel="noopener">
                            https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI
                        </Link>
                        . Wenn Sie mehr über die Datenverarbeitung von Google erfahren wollen, empfehlen wir Ihnen die hauseigene Datenschutzerklärung
                        des Unternehmens unter{' '}
                        <Link href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener">
                            https://policies.google.com/privacy?hl=de
                        </Link>
                        .
                    </Typography>
                    <br />
                    <Typography variant="h6">Google Fonts Datenschutzerklärung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir verwenden Google Fonts der Firma Google Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA) auf unserer
                        Webseite.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Für die Verwendung von Google-Schriftarten müssen Sie sich nicht anmelden bzw. ein Passwort hinterlegen. Weiters werden auch
                        keine Cookies in Ihrem Browser gespeichert. Die Dateien (CSS, Schriftarten/Fonts) werden über die Google-Domains
                        fonts.googleapis.com und fonts.gstatic.com angefordert. Laut Google sind die Anfragen nach CSS und Schriften vollkommen
                        getrennt von allen anderen Google-Diensten. Wenn Sie ein Google-Konto haben, brauchen Sie keine Sorge haben, dass Ihre
                        Google-Kontodaten, während der Verwendung von Google Fonts, an Google übermittelt werden. Google erfasst die Nutzung von CSS
                        (Cascading Style Sheets) und der verwendeten Schriftarten und speichert diese Daten sicher. Wie die Datenspeicherung genau
                        aussieht, werden wir uns noch im Detail ansehen.
                    </Typography>
                    <br />
                    <Typography variant="h5">Was sind Google Fonts?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google Fonts (früher Google Web Fonts) ist ein interaktives Verzeichnis mit mehr als 800 Schriftarten, die die{' '}
                        <Link href="https://de.wikipedia.org/wiki/Google_LLC?tid=311160982" target="_blank" rel="noopener">
                            Google LLC
                        </Link>{' '}
                        zur freien Verwendung bereitstellt.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Viele dieser Schriftarten sind unter der SIL Open Font License veröffentlicht, während andere unter der Apache-Lizenz
                        veröffentlicht wurden. Beides sind freie Software-Lizenzen. Somit können wir sie frei verwenden, ohne dafür Lizenzgebühren zu
                        zahlen.
                    </Typography>
                    <br />
                    <Typography variant="h5">Warum verwenden wir Google Fonts auf unserer Webseite?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Mit Google Fonts können wir auf der eigenen Webseite Schriften nutzen, und müssen sie nicht auf unserem eigenen Server
                        hochladen. Google Fonts ist ein wichtiger Baustein, um die Qualität unserer Webseite hoch zu halten. Alle Google-Schriften
                        sind automatisch für das Web optimiert und dies spart Datenvolumen und ist speziell für die Verwendung bei mobilen Endgeräten
                        ein großer Vorteil. Wenn Sie unsere Seite besuchen, sorgt die niedrige Dateigröße für eine schnelle Ladezeit. Des Weiteren
                        sind Google Fonts sogenannte sichere Web Fonts. Unterschiedliche Bildsynthese-Systeme (Rendering) in verschiedenen Browsern,
                        Betriebssystemen und mobilen Endgeräten können zu Fehlern führen. Solche Fehler können teilweise Texte bzw. ganze Webseiten
                        optisch verzerren. Dank des schnellen Content Delivery Network (CDN) gibt es mit Google Fonts keine plattformübergreifenden
                        Probleme. Google Fonts unterstützt alle gängigen Browser ( Google Chrome, Mozilla Firefox, Apple Safari, Opera) und
                        funktioniert zuverlässig auf den meisten modernen mobilen Betriebssystemen, einschließlich Android 2.2+ und iOS 4.2+ (iPhone,
                        iPad, iPod).
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir verwenden die Google Fonts also, damit wir unser gesamtes Online-Service so schön und einheitlich wie möglich darstellen
                        können. Nach dem Art. 6 Abs. 1 f lit. F DSGVO stellt das bereits ein „berechtigtes Interesse“ an der Verarbeitung von
                        personenbezogenen Daten dar. Unter „berechtigtem Interesse“ versteht man in diesem Fall sowohl rechtliche als auch
                        wirtschaftliche oder ideelle Interessen, die vom Rechtssystem anerkannt werden.
                    </Typography>
                    <br />
                    <Typography variant="h5">Welche Daten werden von Google gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wenn Sie unsere Webseite besuchen, werden die Schriften über einen Google-Server nachgeladen. Durch diesen externen Aufruf
                        werden Daten an die Google-Server übermittelt. So erkennt Google auch, dass Sie bzw. Ihre IP-Adresse unsere Webseite besucht.
                        Die Google Fonts API wurde entwickelt, um die Erfassung, Speicherung und Verwendung von Endnutzerdaten auf das zu reduzieren,
                        was für eine effiziente Bereitstellung von Schriften nötig ist. API steht übrigens für „Application Programming Interface“ und
                        dient unter anderem als Datenübermittler im Softwarebereich.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google Fonts speichert CSS- und Font-Anfragen sicher bei Google und ist somit geschützt. Durch die gesammelten Nutzungszahlen
                        kann Google die Beliebtheit der Schriften feststellen. Die Ergebnisse veröffentlicht Google auf internen Analyseseiten, wie
                        beispielsweise Google Analytics. Zudem verwendet Google auch Daten des eigenen Web-Crawlers, um festzustellen, welche
                        Webseiten Google-Schriften verwenden. Diese Daten werden in der BigQuery-Datenbank von Google Fonts veröffentlicht. BigQuery
                        ist ein Webservice von Google für Unternehmen, die große Datenmengen bewegen und analysieren wollen.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Zu bedenken gilt allerdings noch, dass durch jede Google Font Anfrage auch Informationen wie IP-Adresse, Spracheinstellungen,
                        Bildschirmauflösung des Browsers, Version des Browsers und Name des Browsers automatisch an die Google-Server übertragen
                        werden. Ob diese Daten auch gespeichert werden, ist nicht klar feststellbar bzw. wird von Google nicht eindeutig kommuniziert.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie lange und wo werden die Daten gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Anfragen für CSS-Assets speichert Google einen Tag lang auf Ihren Servern, die hauptsächlich außerhalb der EU angesiedelt
                        sind. Das ermöglicht uns, mithilfe eines Google-Stylesheets die Schriftarten zu nutzen. Ein Stylesheet ist eine Formatvorlage,
                        über die man einfach und schnell z.B. das Design bzw. die Schriftart einer Webseite ändern kann.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Die Font-Dateien werden bei Google ein Jahr gespeichert. Google verfolgt damit das Ziel, die Ladezeit von Webseiten
                        grundsätzlich zu verbessern. Wenn Millionen von Webseiten auf die gleichen Schriften verweisen, werden sie nach dem ersten
                        Besuch zwischengespeichert und erscheinen sofort auf allen anderen später besuchten Webseiten wieder. Manchmal aktualisiert
                        Google Schriftdateien, um die Dateigröße zu reduzieren, die Abdeckung von Sprache zu erhöhen und das Design zu verbessern.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Jene Daten, die Google für einen Tag bzw. ein Jahr speichert können nicht einfach gelöscht werden. Die Daten werden beim
                        Seitenaufruf automatisch an Google übermittelt. Um diese Daten vorzeitig löschen zu können, müssen Sie den Google-Support auf{' '}
                        <Link href="https://support.google.com/?hl=de&amp;tid=311160982" target="_blank" rel="noopener">
                            https://support.google.com/?hl=de&amp;tid=311160982
                        </Link>{' '}
                        kontaktieren. Datenspeicherung verhindern Sie in diesem Fall nur, wenn Sie unsere Seite nicht besuchen.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Anders als andere Web-Schriften erlaubt uns Google uneingeschränkten Zugriff auf alle Schriftarten. Wir können also
                        unlimitiert auf ein Meer an Schriftarten zugreifen und so das Optimum für unsere Webseite rausholen. Mehr zu Google Fonts und
                        weiteren Fragen finden Sie auf{' '}
                        <Link href="https://developers.google.com/fonts/faq?tid=311160982" target="_blank" rel="noopener">
                            https://developers.google.com/fonts/faq?tid=311160982
                        </Link>
                        . Dort geht zwar Google auf datenschutzrelevante Angelegenheiten ein, doch wirklich detaillierte Informationen über
                        Datenspeicherung sind nicht enthalten. Es ist relativ schwierig (beinahe unmöglich), von Google wirklich präzise Informationen
                        über gespeicherten Daten zu bekommen.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Welche Daten grundsätzlich von Google erfasst werden und wofür diese Daten verwendet werden, können Sie auch auf{' '}
                        <Link>https://www.google.com/intl/de/policies/privacy/</Link> nachlesen.
                    </Typography>
                    <br />
                    <Typography variant="h6">Google Fonts Lokal Datenschutzerklärung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir verwenden Google Fonts der Firma Google Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA) auf unserer
                        Webseite. Wir haben die Google-Schriftarten lokal, d.h. auf unserem Webserver &#8211; nicht auf den Servern von Google &#8211;
                        eingebunden. Dadurch gibt es keine Verbindung zu Server von Google und somit auch keine Datenübertragung bzw. Speicherung.
                    </Typography>
                    <br />
                    <Typography variant="h5">Was sind Google Fonts?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google Fonts (früher Google Web Fonts) ist ein interaktives Verzeichnis mit mehr als 800 Schriftarten, die die{' '}
                        <Link href="https://de.wikipedia.org/wiki/Google_LLC?tid=311160982">Google LLC</Link> zur freien Verwendung bereitstellt. Mit
                        Google Fonts könnte man die Schriften nutzen, ohne sie auf den eigenen Server hochzuladen. Doch um diesbezüglich jede
                        Informationsübertragung zum Google-Server zu unterbinden, haben wir die Schriftarten auf unseren Server heruntergeladen. Auf
                        diese Weise handeln wir datenschutzkonform und senden keine Daten an Google Fonts weiter.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Anders als andere Web-Schriften erlaubt uns Google uneingeschränkten Zugriff auf alle Schriftarten. Wir können also
                        unlimitiert auf ein Meer an Schriftarten zugreifen und so das Optimum für unsere Webseite rausholen. Mehr zu Google Fonts und
                        weiteren Fragen finden Sie auf{' '}
                        <Link href="https://developers.google.com/fonts/faq?tid=311160982">
                            https://developers.google.com/fonts/faq?tid=311160982
                        </Link>
                        .
                    </Typography>
                    <br />
                    <Typography variant="h6">Google Analytics Datenschutzerklärung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir verwenden auf unserer Website das Analyse-Tracking Tool Google Analytics (GA) des amerikanischen Unternehmens Google LLC
                        (1600 Amphitheatre Parkway Mountain View, CA 94043, USA). Google Analytics sammelt Daten über Ihre Handlungen auf unserer
                        Website. Wenn Sie beispielsweise einen Link anklicken, wird diese Aktion in einem Cookie gespeichert und an Google Analytics
                        versandt. Mithilfe der Berichte, die wir von Google Analytics erhalten, können wir unsere Website und unser Service besser an
                        Ihre Wünsche anpassen. Im Folgenden gehen wir näher auf das Tracking Tool ein und informieren Sie vor allem darüber, welche
                        Daten gespeichert werden und wie Sie das verhindern können.
                    </Typography>
                    <br />
                    <Typography variant="h5">Was ist Google Analytics?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google Analytics ist ein Trackingtool, das der Datenverkehrsanalyse unserer Website dient. Damit Google Analytics
                        funktioniert, wird ein Tracking-Code in den Code unserer Website eingebaut. Wenn Sie unsere Website besuchen, zeichnet dieser
                        Code verschiedene Handlungen auf, die Sie auf unserer Website ausführen. Sobald Sie unsere Website verlassen, werden diese
                        Daten an die Google-Analytics-Server gesendet und dort gespeichert.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google verarbeitet die Daten und wir bekommen Berichte über Ihr Userverhalten. Dabei kann es sich unter anderem um folgende
                        Berichte handeln:
                    </Typography>
                    <br />
                    <Typography>
                        <ul>
                            <li>
                                Zielgruppenberichte: Über Zielgruppenberichte lernen wir unsere User besser kennen und wissen genauer, wer sich für
                                unser Service interessiert.
                            </li>
                            <li>Anzeigeberichte: Durch Anzeigeberichte können wir unsere Onlinewerbung leichter analysieren und verbessern.</li>
                            <li>
                                Akquisitionsberichte: Akquisitionsberichte geben uns hilfreiche Informationen darüber, wie wir mehr Menschen für unser
                                Service begeistern können.
                            </li>
                            <li>
                                Verhaltensberichte: Hier erfahren wir, wie Sie mit unserer Website interagieren. Wir können nachvollziehen welchen Weg
                                Sie auf unserer Seite zurücklegen und welche Links Sie anklicken.
                            </li>
                            <li>
                                Conversionsberichte: Conversion nennt man einen Vorgang, bei dem Sie aufgrund einer Marketing-Botschaft eine
                                gewünschte Handlung ausführen. Zum Beispiel, wenn Sie von einem reinen Websitebesucher zu einem Käufer oder
                                Newsletter-Abonnent werden. Mithilfe dieser Berichte erfahren wir mehr darüber, wie unsere Marketing-Maßnahmen bei
                                Ihnen ankommen. So wollen wir unsere Conversionrate steigern.
                            </li>
                            <li>
                                Echtzeitberichte: Hier erfahren wir immer sofort, was gerade auf unserer Website passiert. Zum Beispiel sehen wir wie
                                viele User gerade diesen Text lesen.
                            </li>
                        </ul>
                    </Typography>
                    <Typography variant="h5">Warum verwenden wir Google Analytics auf unserer Webseite?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Unser Ziel mit dieser Website ist klar: Wir wollen Ihnen das bestmögliche Service bieten. Die Statistiken und Daten von Google
                        Analytics helfen uns dieses Ziel zu erreichen.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Die statistisch ausgewerteten Daten zeigen uns ein klares Bild von den Stärken und Schwächen unserer Website. Einerseits
                        können wir unsere Seite so optimieren, dass sie von interessierten Menschen auf Google leichter gefunden wird. Andererseits
                        helfen uns die Daten, Sie als Besucher besser zu verstehen. Wir wissen somit sehr genau, was wir an unserer Website verbessern
                        müssen, um Ihnen das bestmögliche Service zu bieten. Die Daten dienen uns auch, unsere Werbe- und Marketing-Maßnahmen
                        individueller und kostengünstiger durchzuführen. Schließlich macht es nur Sinn, unsere Produkte und Dienstleistungen Menschen
                        zu zeigen, die sich dafür interessieren.
                    </Typography>
                    <br />
                    <Typography variant="h5">Welche Daten werden von Google Analytics gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google Analytics erstellt mithilfe eines Tracking-Codes eine zufällige, eindeutige ID, die mit Ihrem Browser-Cookie verbunden
                        ist. So erkennt Sie Google Analytics als neuen User. Wenn Sie das nächste Mal unsere Seite besuchen, werden Sie als
                        „wiederkehrender“ User erkannt. Alle gesammelten Daten werden gemeinsam mit dieser User-ID gespeichert. So ist es überhaupt
                        erst möglich pseudonyme Userprofile auszuwerten.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Durch Kennzeichnungen wie Cookies und App-Instanz-IDs werden Ihre Interaktionen auf unserer Website gemessen. Interaktionen
                        sind alle Arten von Handlungen, die Sie auf unserer Website ausführen. Wenn Sie auch andere Google-Systeme (wie z.B. ein
                        Google-Konto) nützen, können über Google Analytics generierte Daten mit Drittanbieter-Cookies verknüpft werden. Google gibt
                        keine Google Analytics-Daten weiter, außer wir als Websitebetreiber genehmigen das. Zu Ausnahmen kann es kommen, wenn es
                        gesetzlich erforderlich ist.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>Folgende Cookies werden von Google Analytics verwendet:</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> _ga
                        <br />
                        <b>Wert:</b>
                        2.1326744211.152311160982-5
                        <br />
                        <b>Verwendungszweck:</b> Standardmäßig verwendet analytics.js das Cookie _ga, um die User-ID zu speichern. Grundsätzlich dient
                        es zur Unterscheidung der Webseitenbesucher.
                        <br />
                        <b>Ablaufdatum:</b> nach 2 Jahre
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> _gid
                        <br />
                        <b>Wert:</b>
                        2.1687193234.152311160982-1
                        <br />
                        <b>Verwendungszweck:</b> Das Cookie dient auch zur Unterscheidung der Webseitenbesucher
                        <br />
                        <b>Ablaufdatum:</b> nach 24 Stunden
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> _gat_gtag_UA_&lt;property-id&gt;
                        <br />
                        <b>Wert:</b> 1<br />
                        <b>Verwendungszweck:</b> Wird zum Senken der Anforderungsrate verwendet. Wenn Google Analytics über den Google Tag Manager
                        bereitgestellt wird, erhält dieser Cookie den Namen _dc_gtm_ &lt;property-id&gt;.
                        <br />
                        <b>Ablaufdatum: </b>nach 1 Minute
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> AMP_TOKEN
                        <br />
                        <b>Wert:</b> keine Angaben
                        <br />
                        <b>Verwendungszweck:</b> Das Cookie hat einen Token, mit dem eine User ID vom AMP-Client-ID-Dienst abgerufen werden kann.
                        Andere mögliche Werte weisen auf eine Abmeldung, eine Anfrage oder einen Fehler hin.
                        <br />
                        <b>Ablaufdatum:</b> nach 30 Sekunden bis zu einem Jahr
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> __utma
                        <br />
                        <b>Wert:</b>
                        1564498958.1564498958.1564498958.1
                        <br />
                        <b>Verwendungszweck:</b> Mit diesem Cookie kann man Ihr Verhalten auf der Website verfolgen und sie Leistung messen. Das
                        Cookie wird jedes Mal aktualisiert, wenn Informationen an Google Analytics gesendet werden.
                        <br />
                        <b>Ablaufdatum:</b> nach 2 Jahre
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> __utmt
                        <br />
                        <b>Wert:</b> 1<br />
                        <b>Verwendungszweck:</b> Das Cookie wird wie _gat_gtag_UA_&lt;property-id&gt; zum Drosseln der Anforderungsrate verwendet.
                        <br />
                        <b>Ablaufdatum:</b> nach 10 Minuten
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> __utmb
                        <br />
                        <b>Wert:</b>3.10.1564498958
                        <br />
                        <b>Verwendungszweck:</b> Dieses Cookie wird verwendet, um neue Sitzungen zu bestimmen. Es wird jedes Mal aktualisiert, wenn
                        neue Daten bzw. Infos an Google Analytics gesendet werden.
                        <br />
                        <b>Ablaufdatum:</b> nach 30 Minuten
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> __utmc
                        <br />
                        <b>Wert:</b> 167421564
                        <br />
                        <b>Verwendungszweck:</b> Dieses Cookie wird verwendet, um neue Sitzungen für wiederkehrende Besucher festzulegen. Dabei
                        handelt es sich um ein Session-Cookie und wird nur solange gespeichert, bis Sie den Browser wieder schließen.
                        <br />
                        <b>Ablaufdatum:</b> Nach Schließung des Browsers
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> __utmz
                        <br />
                        <b>Wert:</b> m|utmccn=(referral)|utmcmd=referral|utmcct=/
                        <br />
                        <b>Verwendungszweck:</b> Das Cookie wird verwendet, um die Quelle des Besucheraufkommens auf unserer Website zu
                        identifizieren. Das heißt, das Cookie speichert, von wo Sie auf unsere Website gekommen sind. Das kann eine andere Seite bzw.
                        eine Werbeschaltung gewesen sein.
                        <br />
                        <b>Ablaufdatum:</b> nach 6 Monate
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> __utmv
                        <br />
                        <b>Wert:</b> keine Angabe
                        <br />
                        <b>Verwendungszweck:</b> Das Cookie wird verwendet, um benutzerdefinierte Userdaten zu speichern. Es wird immer aktualisiert,
                        wenn Informationen an Google Analytics gesendet werden.
                        <br />
                        <b>Ablaufdatum:</b> nach 2 Jahre
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Anmerkung:</b> Diese Aufzählung kann keinen Anspruch auf Vollständigkeit erheben, da Google die Wahl ihrer Cookies immer
                        wieder auch verändert.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Hier zeigen wir Ihnen einen Überblick über die wichtigsten Daten, die mit Google Analytics erhoben werden:
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Heatmaps:</b> Google legt sogenannte Heatmaps an. Über Heatmaps sieht man genau jene Bereiche, die Sie anklicken. So
                        bekommen wir Informationen, wo Sie auf unserer Seite „unterwegs“ sind.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Sitzungsdauer:</b> Als Sitzungsdauer bezeichnet Google die Zeit, die Sie auf unserer Seite verbringen, ohne die Seite zu
                        verlassen. Wenn Sie 20 Minuten inaktiv waren, endet die Sitzung automatisch.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Absprungrate</b> (engl. Bouncerate): Von einem Absprung ist die Rede, wenn Sie auf unserer Website nur eine Seite ansehen
                        und dann unsere Website wieder verlassen.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Kontoerstellung:</b> Wenn Sie auf unserer Website ein Konto erstellen bzw. eine Bestellung machen, erhebt Google Analytics
                        diese Daten.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>IP-Adresse:</b> Die IP-Adresse wird nur in gekürzter Form dargestellt, damit keine eindeutige Zuordnung möglich ist.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Standort:</b> Über die IP-Adresse kann das Land und Ihr ungefährer Standort bestimmt werden. Diesen Vorgang bezeichnet man
                        auch als IP- Standortbestimmung.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Technische Informationen:</b> Zu den technischen Informationen zählen unter anderem Ihr Browsertyp, Ihr Internetanbieter
                        oder Ihre Bildschirmauflösung.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Herkunftsquelle:</b> Google Analytics beziehungsweise uns interessiert natürlich auch über welche Website oder welche
                        Werbung Sie auf unsere Seite gekommen sind.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Weitere Daten sind Kontaktdaten, etwaige Bewertungen, das Abspielen von Medien (z.B., wenn Sie ein Video über unsere Seite
                        abspielen), das Teilen von Inhalten über Social Media oder das Hinzufügen zu Ihren Favoriten. Die Aufzählung hat keinen
                        Vollständigkeitsanspruch und dient nur zu einer allgemeinen Orientierung der Datenspeicherung durch Google Analytics.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie lange und wo werden die Daten gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google hat Ihre Server auf der ganzen Welt verteilt. Die meisten Server befinden sich in Amerika und folglich werden Ihr Daten
                        meist auf amerikanischen Servern gespeichert. Hier können Sie genau nachlesen wo sich die Google-Rechenzentren befinden:{' '}
                        <Link href="https://www.google.com/about/datacenters/inside/locations/?hl=de" target="_blank" rel="noopener">
                            https://www.google.com/about/datacenters/inside/locations/?hl=de
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Ihre Daten werden auf verschiedenen physischen Datenträgern verteilt. Das hat den Vorteil, dass die Daten schneller abrufbar
                        sind und vor Manipulation besser geschützt sind. In jedem Google-Rechenzentrum gibt es entsprechende Notfallprogramme für Ihre
                        Daten. Wenn beispielsweise die Hardware bei Google ausfällt oder Naturkatastrophen Server lahmlegen, bleibt das Risiko einer
                        Dienstunterbrechung bei Google dennoch gering.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Standardisiert ist bei Google Analytics eine Aufbewahrungsdauer Ihrer Userdaten von 26 Monaten eingestellt. Dann werden Ihre
                        Userdaten gelöscht. Allerdings haben wir die Möglichkeit, die Aufbewahrungsdauer von Nutzdaten selbst zu wählen. Dafür stehen
                        uns fünf Varianten zur Verfügung:
                    </Typography>
                    <br />
                    <Typography>
                        <ul>
                            <li>Löschung nach 14 Monaten</li>
                            <li>Löschung nach 26 Monaten</li>
                            <li>Löschung nach 38 Monaten</li>
                            <li>Löschung nach 50 Monaten</li>
                            <li>Keine automatische Löschung</li>
                        </ul>
                    </Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Wenn der festgelegte Zeitraum abgelaufen ist, werden einmal im Monat die Daten gelöscht. Diese Aufbewahrungsdauer gilt für
                        Ihre Daten, die mit Cookies, Usererkennung und Werbe-IDs (z.B. Cookies der DoubleClick-Domain) verknüpft sind.
                        Berichtergebnisse basieren auf aggregierten Daten und werden unabhängig von Nutzerdaten gespeichert. Aggregierte Daten sind
                        eine Zusammenschmelzung von Einzeldaten zu einer größeren Einheit.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Nach dem Datenschutzrecht der Europäischen Union haben Sie das Recht, Auskunft über Ihre Daten zu erhalten, sie zu
                        aktualisieren, zu löschen oder einzuschränken. Mithilfe des Browser-Add-ons zur Deaktivierung von Google Analytics-JavaScript
                        (ga.js, analytics.js, dc.js) verhindern Sie, dass Google Analytics Ihre Daten verwendet. Das Browser-Add-on können Sie unter{' '}
                        <Link href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener">
                            https://tools.google.com/dlpage/gaoptout?hl=de
                        </Link>{' '}
                        runterladen und installieren. Beachten Sie bitte, dass durch dieses Add-on nur die Datenerhebung durch Google Analytics
                        deaktiviert wird.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Falls Sie grundsätzlich Cookies (unabhängig von Google Analytics) deaktivieren, löschen oder verwalten wollen, gibt es für
                        jeden Browser eine eigene Anleitung:
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link href="https://support.google.com/chrome/answer/95647?tid=311160982" target="_blank" rel="noopener">
                            Chrome: Cookies in Chrome löschen, aktivieren und verwalten
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link href="https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=311160982" target="_blank" rel="noopener">
                            Safari: Verwalten von Cookies und Websitedaten mit Safari
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf Ihrem Computer abgelegt haben
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Internet Explorer: Löschen und Verwalten von Cookies
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Microsoft Edge: Löschen und Verwalten von Cookies
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google Analytics ist aktiver Teilnehmer beim EU-U.S. Privacy Shield Framework, wodurch der korrekte und sichere Datentransfer
                        persönlicher Daten geregelt wird. Mehr Informationen dazu finden Sie auf{' '}
                        <Link href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI" target="_blank" rel="follow noopener">
                            https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;tid=311160982
                        </Link>
                        . Wir hoffen wir konnten Ihnen die wichtigsten Informationen rund um die Datenverarbeitung von Google Analytics näherbringen.
                        Wenn Sie mehr über den Tracking-Dienst erfahren wollen, empfehlen wir diese beiden Links:{' '}
                        <Link href="http://www.google.com/analytics/terms/de.html" target="_blank" rel="noopener">
                            http://www.google.com/analytics/terms/de.html
                        </Link>{' '}
                        und{' '}
                        <Link href="https://support.google.com/analytics/answer/6004245?hl=de" target="_blank" rel="noopener">
                            https://support.google.com/analytics/answer/6004245?hl=de
                        </Link>
                        .
                    </Typography>
                    <br />
                    <Typography variant="h6">Automatische Datenspeicherung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wenn Sie heutzutage Webseiten besuchen, werden gewisse Informationen automatisch erstellt und gespeichert, so auch auf dieser
                        Webseite.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wenn Sie unsere Webseite so wie jetzt gerade besuchen, speichert unser Webserver (Computer auf dem diese Webseite gespeichert
                        ist) automatisch Daten wie
                    </Typography>
                    <br />
                    <Typography>
                        <ul>
                            <li>die Adresse (URL) der aufgerufenen Webseite</li>
                            <li>Browser und Browserversion</li>
                            <li>das verwendete Betriebssystem</li>
                            <li>die Adresse (URL) der zuvor besuchten Seite (Referrer URL)</li>
                            <li>den Hostname und die IP-Adresse des Geräts von welchem aus zugegriffen wird</li>
                            <li>Datum und Uhrzeit</li>
                        </ul>
                    </Typography>
                    <Typography style={{ textAlign: 'justify' }}>in Dateien (Webserver-Logfiles).</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        In der Regel werden Webserver-Logfiles zwei Wochen gespeichert und danach automatisch gelöscht. Wir geben diese Daten nicht
                        weiter, können jedoch nicht ausschließen, dass diese Daten beim Vorliegen von rechtswidrigem Verhalten eingesehen werden.
                    </Typography>
                    <br />
                    <Typography variant="h6">Facebook-Pixel Datenschutzerklärung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir verwenden auf unserer Webseite das Facebook-Pixel von Facebook. Dafür haben wir einen Code auf unserer Webseite
                        implementiert. Der Facebook-Pixel ist ein Ausschnitt aus JavaScript-Code, der eine Ansammlung von Funktionen lädt, mit denen
                        Facebook Ihre Userhandlungen verfolgen kann, sofern Sie über Facebook-Ads auf unsere Webseite gekommen sind. Wenn Sie
                        beispielsweise ein Produkt auf unserer Webseite erwerben, wird das Facebook-Pixel ausgelöst und speichert Ihre Handlungen auf
                        unserer Webseite in einem oder mehreren Cookies. Diese Cookies ermöglichen es Facebook Ihre Userdaten (Kundendaten wie
                        IP-Adresse, User-ID) mit den Daten Ihres Facebook-Kontos abzugleichen. Dann löscht Facebook diese Daten wieder. Die erhobenen
                        Daten sind für uns anonym und nicht einsehbar und werden nur im Rahmen von Werbeanzeigenschaltungen nutzbar. Wenn Sie selbst
                        Facebook-User sind und angemeldet sind, wird der Besuch unserer Webseite automatisch Ihrem Facebook-Benutzerkonto zugeordnet.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir wollen unsere Dienstleistungen bzw. Produkte nur jenen Menschen zeigen, die sich auch wirklich dafür interessieren.
                        Mithilfe von Facebook-Pixel können unsere Werbemaßnahmen besser auf Ihre Wünsche und Interessen abgestimmt werden. So bekommen
                        Facebook-User (sofern sie personalisierte Werbung erlaubt haben) passende Werbung zu sehen. Weiters verwendet Facebook die
                        erhobenen Daten zu Analysezwecken und eigenen Werbeanzeigen.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Im Folgenden zeigen wir Ihnen jene Cookies, die durch das Einbinden von Facebook-Pixel auf einer Testseite gesetzt wurden.
                        Bitte beachten Sie, dass dies nur Beispiel-Cookies sind. Je nach Interaktion auf unserer Webseite werden unterschiedliche
                        Cookies gesetzt.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> _fbp
                        <br />
                        <b>Wert:</b> fb.1.1568287647279.257405483-6311160982-7
                        <br />
                        <b>Verwendungszweck:</b> Dieses Cookie verwendet Facebook, um Werbeprodukte anzuzeigen.
                        <br />
                        <b>Ablaufdatum:</b> nach 3 Monaten
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> fr
                        <br />
                        <b>Wert:</b> 0aPf312HOS5Pboo2r..Bdeiuf&#8230;1.0.Bdeiuf.
                        <br />
                        <b>Verwendungszweck:</b> Dieses Cookie wird verwendet, damit Facebook-Pixel auch ordentlich funktioniert.
                        <br />
                        <b>Ablaufdatum:</b> nach 3 Monaten
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> comment_author_50ae8267e2bdf1253ec1a5769f48e062311160982-3
                        <br />
                        <b>Wert:</b> Name des Autors
                        <br />
                        <b>Verwendungszweck:</b> Dieses Cookie speichert den Text und den Namen eines Users, der beispielsweise einen Kommentar
                        hinterlässt.
                        <br />
                        <b>Ablaufdatum:</b> nach 12 Monaten
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> comment_author_url_50ae8267e2bdf1253ec1a5769f48e062
                        <br />
                        <b>Wert:</b> https%3A%2F%2Fwww.testseite…%2F (URL des Autors)
                        <br />
                        <b>Verwendungszweck:</b> Dieses Cookie speichert die URL der Website, die der User in einem Textfeld auf unserer Webseite
                        eingibt.
                        <br />
                        <b>Ablaufdatum:</b> nach 12 Monaten
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> comment_author_email_50ae8267e2bdf1253ec1a5769f48e062
                        <br />
                        <b>Wert:</b> E-Mail-Adresse des Autors
                        <br />
                        <b>Verwendungszweck:</b> Dieses Cookie speichert die E-Mail-Adresse des Users, sofern er sie auf der Website bekannt gegeben
                        hat.
                        <br />
                        <b>Ablaufdatum:</b> nach 12 Monaten
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Anmerkung: </b>Die oben genannten Cookies beziehen sich auf ein individuelles Userverhalten. Speziell bei der Verwendung
                        von Cookies sind Veränderungen bei Facebook nie auszuschließen.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Sofern Sie bei Facebook angemeldet sind, können Sie Ihre Einstellungen für Werbeanzeigen unter{' '}
                        <Link href="https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen" target="_blank" rel="noopener">
                            https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen
                        </Link>
                        selbst verändern. Falls Sie kein Facebook-User sind, können Sie auf{' '}
                        <Link href="http://www.youronlinechoices.com/de/praferenzmanagement/?tid=311160982" target="_blank" rel="noopener">
                            http://www.youronlinechoices.com/de/praferenzmanagement/
                        </Link>{' '}
                        grundsätzlich Ihre nutzungsbasierte Online-Werbung verwalten. Dort haben Sie die Möglichkeit, Anbieter zu deaktivieren bzw. zu
                        aktivieren.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wenn Sie mehr über den Datenschutz von Facebook erfahren wollen, empfehlen wir Ihnen die eigenen Datenrichtlinien des
                        Unternehmens auf{' '}
                        <Link href="https://www.facebook.com/policy.php" target="_blank" rel="noopener">
                            https://www.facebook.com/policy.php
                        </Link>
                        .
                    </Typography>
                    <br />
                    <Typography variant="h6">Google Tag Manager Datenschutzerklärung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Für unsere Webseite verwenden wir den Google Tag Manager des Unternehmens Google Inc. (1600 Amphitheatre Parkway Mountain
                        View, CA 94043, USA). Dieser Tag Manager ist eines von vielen hilfreichen Marketing-Produkten von Google. Über den Google Tag
                        Manager können wir Code-Abschnitte von diversen Trackingtools, die wir auf unserer Webseite verwenden, zentral einbauen und
                        verwalten.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        In dieser Datenschutzerklärung wollen wir Ihnen genauer erklären was der Google Tag Manager macht, warum wir ihn verwenden und
                        in welcher Form Daten verarbeitet werden.
                    </Typography>
                    <br />
                    <Typography variant="h5">Was ist der Google Tag Manager?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Der Google Tag Manager ist ein Organisationstool, mit dem wir Webseiten-Tags zentral und über eine Benutzeroberfläche
                        einbinden und verwalten können. Als Tags bezeichnet man kleine Code-Abschnitte, die beispielsweise Ihre Aktivitäten auf
                        unserer Webseite aufzeichnen (tracken). Dafür werden JavaScript-Code-Abschnitte in den Quelltext unserer Seite eingesetzt. Die
                        Tags stammen oft von google-internen Produkten wie Google Ads oder Google Analytics, aber auch Tags von anderen Unternehmen
                        können über den Manager eingebunden und verwaltet werden. Solche Tags übernehmen unterschiedliche Aufgaben. Sie können
                        Browserdaten sammeln, Marketingtools mit Daten füttern, Buttons einbinden, Cookies setzen und auch Nutzer über mehrere
                        Webseiten hinweg verfolgen.
                    </Typography>
                    <br />
                    <Typography variant="h5">Warum verwenden wir den Google Tag Manager für unserer Webseite?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wie sagt man so schön: Organisation ist die halbe Miete! Und das betrifft natürlich auch die Pflege unserer Webseite. Um
                        unsere Webseite für Sie und alle Menschen, die sich für unsere Produkte und Dienstleistungen interessieren, so gut wie möglich
                        zu gestalten, brauchen wir diverse Trackingtools wie beispielsweise Google Analytics. Die erhobenen Daten dieser Tools zeigen
                        uns, was Sie am meisten interessiert, wo wir unsere Leistungen verbessern können und welchen Menschen wir unsere Angebote noch
                        zeigen sollten. Und damit dieses Tracking funktioniert, müssen wir entsprechende JavaScript-Codes in unsere Webseite
                        einbinden. Grundsätzlich könnten wir jeden Code-Abschnitt der einzelnen Tracking-Tools separat in unseren Quelltext einbauen.
                        Das erfordert allerdings relativ viel Zeit und man verliert leicht den Überblick. Darum nützen wir den Google Tag Manager. Wir
                        können die nötigen Skripte einfach einbauen und von einem Ort aus verwalten. Zudem bietet der Google Tag Manager eine leicht
                        zu bedienende Benutzeroberfläche und man benötigt keine Programmierkenntnisse. So schaffen wir es, Ordnung in unserem
                        Tag-Dschungel zu halten.
                    </Typography>
                    <br />
                    <Typography variant="h5">Welche Daten werden vom Google Tag Manager gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Der Tag Manager selbst ist eine Domain, die keine Cookies setzt und keine Daten speichert. Er fungiert als bloßer „Verwalter“
                        der implementierten Tags. Die Daten erfassen die einzelnen Tags der unterschiedlichen Web-Analysetools. Die Daten werden im
                        Google Tag Manager quasi zu den einzelnen Tracking-Tools durchgeschleust und nicht gespeichert.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Ganz anders sieht das allerdings mit den eingebundenen Tags der verschiedenen Web-Analysetools, wie zum Beispiel Google
                        Analytics, aus. Je nach Analysetool werden meist mit Hilfe von Cookies verschiedenen Daten über Ihr Webverhalten gesammelt,
                        gespeichert und verarbeitet. Dafür lesen Sie bitte unsere Datenschutztexte zu den einzelnen Analyse- und Trackingtools, die
                        wir auf unserer Webseite verwenden.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        In den Kontoeinstellungen des Tag Managers haben wir Google erlaubt, dass Google anonymisierte Daten von uns erhält. Dabei
                        handelt es sich aber nur um die Verwendung und Nutzung unseres Tag Managers und nicht um Ihre Daten, die über die
                        Code-Abschnitte gespeichert werden. Wir ermöglichen Google und anderen, ausgewählte Daten in anonymisierter Form zu erhalten.
                        Wir stimmen somit der anonymen Weitergabe unseren Website-Daten zu. Welche zusammengefassten und anonymen Daten genau
                        weitergeleitet werden, konnten wir – trotz langer Recherche – nicht in Erfahrung bringen. Auf jeden Fall löscht Google dabei
                        alle Infos, die unsere Webseite identifizieren könnten. Google fasst die Daten mit Hunderten anderen anonymen Webseiten-Daten
                        zusammen und erstellt, im Rahmen von Benchmarking-Maßnahmen, Usertrends. Bei Benchmarking werden eigene Ergebnisse mit jenen
                        der Mitbewerber verglichen. Auf Basis der erhobenen Informationen können Prozesse optimiert werden.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie lange und wo werden die Daten gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wenn Google Daten speichert, dann werden diese Daten auf den eigenen Google-Servern gespeichert. Die Server sind auf der
                        ganzen Welt verteilt. Die meisten befinden sich in Amerika. Unter{' '}
                        <Link href="https://www.google.com/about/datacenters/inside/locations/?hl=de" target="_blank" rel="noopener">
                            https://www.google.com/about/datacenters/inside/locations/?hl=de
                        </Link>{' '}
                        können Sie genau nachlesen, wo sich die Google-Server befinden.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wie lange die einzelnen Tracking-Tools Daten von Ihnen speichern, entnehmen Sie unseren individuellen Datenschutztexten zu den
                        einzelnen Tools.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Der Google Tag Manager selbst setzt keine Cookies, sondern verwaltet Tags verschiedener Tracking-Webseiten. In unseren
                        Datenschutztexten zu den einzelnen Tracking-Tools, finden Sie detaillierte Informationen wie Sie Ihre Daten löschen bzw.
                        verwalten können.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google ist aktiver Teilnehmer beim EU-U.S. Privacy Shield Framework, wodurch der korrekte und sichere Datentransfer
                        persönlicher Daten geregelt wird. Mehr Informationen dazu finden Sie auf{' '}
                        <Link href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI" target="_blank" rel="noopener">
                            https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;tid=311160982
                        </Link>
                        . Wenn Sie mehr über den Google Tag Manager erfahren wollen, empfehlen wir Ihnen die FAQs unter{' '}
                        <Link href="https://www.google.com/intl/de/tagmanager/faq.html" target="_blank" rel="noopener">
                            https://www.google.com/intl/de/tagmanager/faq.html
                        </Link>
                        .
                    </Typography>
                    <br />
                    <Typography variant="h6">Newsletter Datenschutzerklärung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <span className="adsimple-311160982" style={{ fontWeight: 400 }}>
                            Wenn Sie sich für unseren Newsletter eintragen übermitteln Sie die oben genannten persönlichen Daten und geben uns das
                            Recht Sie per E-Mail zu kontaktieren. Die im Rahmen der Anmeldung zum Newsletter gespeicherten Daten nutzen wir
                            ausschließlich für unseren Newsletter und geben diese nicht weiter.
                        </span>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <span className="adsimple-311160982" style={{ fontWeight: 400 }}>
                            Sollten Sie sich vom Newsletter abmelden &#8211; Sie finden den Link dafür in jedem Newsletter ganz unten &#8211; dann
                            löschen wir alle Daten die mit der Anmeldung zum Newsletter gespeichert wurden.
                        </span>
                    </Typography>
                    <br />
                    <Typography variant="h6">Google AdSense Datenschutzerklärung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir verwenden auf dieser Webseite Google AdSense, dem Anzeigenprogramm der Firma Google Inc. (1600 Amphitheatre Parkway
                        Mountain View, CA 94043, USA). Mit Google AdSense können wir auf dieser Webseite Werbeanzeigen einblenden, die zu unserem
                        Thema passen. So bieten wir Ihnen Anzeigen, die im Idealfall einen richtigen Mehrwert für Sie darstellen. Im Zuge dieser
                        Datenschutzerklärung über Google AdSense erklären wir Ihnen, warum wir Google AdSense auf unserer Webseite verwenden, welche
                        Daten von Ihnen verarbeitet und gespeichert werden und wie Sie diese Datenspeicherung unterbinden können.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Rechtsgrundlage für die Verwendung von Google AdSense ist Artikel 6 (1) f (Rechtmäßigkeit der Verarbeitung), denn es besteht
                        ein berechtigtes Interesse gezielte Werbemaßnahmen durchzuführen.
                    </Typography>
                    <br />
                    <Typography variant="h5">Was ist Google AdSense?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google AdSense gibt es mittlerweile seit 2003 und ist ein Werbeprogramm der Firma Google. Im Gegensatz zu Google Ads (früher:
                        Google AdWords) kann man hier nicht selbst Werbung schalten. Über Google AdSense werden Werbeanzeigen auf Webseiten, wie zum
                        Beispiel auf unserer, ausgespielt. Der größte Vorteil dieses Werbedienstes im Vergleich zu manch anderen ist, dass Ihnen
                        Google AdSense nur Anzeigen zeigt, die zu unseren Inhalten passen. Google hat einen eigenen Algorithmus, der berechnet, welche
                        Werbeanzeigen Sie zu Gesicht bekommen. Natürlich wollen wir Ihnen nur Werbung bieten, die Sie auch interessiert und Ihnen
                        einen Mehrwert bietet. Google überprüft anhand Ihrer Interessen bzw. Ihres Userverhaltens und anhand unseres Angebots, welche
                        Werbeanzeigen für unsere Webseite und für unserer User geeignet sind. An dieser Stelle wollen wir auch gleich erwähnen, dass
                        wir für die Auswahl der Werbeanzeigen folglich nicht verantwortlich sind. Wir bieten mit unserer Website lediglich die
                        Werbefläche an. Die Auswahl der angezeigten Werbung trifft Google. Seit August 2013 werden die Anzeigen auch an die jeweilige
                        Benutzeroberfläche angepasst. Das heißt, egal ob Sie von Ihrem Smartphone, Ihrem PC oder Laptop unsere Webseite besuchen, die
                        Anzeigen passen sich an Ihr Endgerät an.
                    </Typography>
                    <br />
                    <Typography variant="h5">Warum verwenden wir Google AdSense auf unserer Webseite?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Das Betreiben einer qualitativ hochwertigen Webseite erfordert viel Hingabe und großen Einsatz. Im Grunde sind wir mit der
                        Arbeit an unserer Webseite nie fertig. Wir versuchen stets unsere Seite zu pflegen und so aktuell wie möglich zu halten.
                        Natürlich wollen wir mit dieser Arbeit auch einen wirtschaftlichen Erfolg erzielen. Darum haben wir uns für Werbeanzeigen als
                        Einnahmequelle entschieden. Das Wichtigste für uns ist allerdings, Ihren Besuch auf unserer Webseite durch diese Anzeigen
                        nicht zu stören. Mithilfe von Google AdSense wird Ihnen nur Werbung angeboten, die zu unseren Themen und Ihren Interessen
                        passt.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Ähnlich wie bei der Google-Indexierung für eine Webseite, untersucht ein Bot den entsprechenden Content und die entsprechenden
                        Angebote unserer Webseite. Dann werden die Werbeanzeigen inhaltlich angepasst und auf der Webseite präsentiert. Neben den
                        inhaltlichen Überschneidungen zwischen Anzeige und Webseiten-Angebot unterstützt AdSense auch interessensbezogenes Targeting.
                        Das bedeutet, dass Google auch Ihre Daten dazu verwendet, um auf Sie zugeschnittene Werbung anzubieten. So erhalten Sie
                        Werbung, die Ihnen im Idealfall einen echten Mehrwert bietet und wir haben eine höhere Chance ein bisschen etwas zu verdienen.
                    </Typography>
                    <br />
                    <Typography variant="h5">Welche Daten werden von Google AdSense gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Damit Google AdSense eine maßgeschneiderte, auf Sie angepasste Werbung anzeigen kann, werden unter anderem Cookies verwendet.
                        Cookies sind kleine Textdateien, die bestimmte Informationen auf Ihrem Computer speichern.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        In AdSense sollen Cookies bessere Werbung ermöglichen. Die Cookies enthalten keine personenidentifizierbaren Daten. Hierbei
                        ist allerdings zu beachten, dass Google Daten wie zum Beispiel &#8220;Pseudonyme Cookie-IDs&#8221; (Name oder anderes
                        Identifikationsmerkmal wird durch ein Pseudonym ersetzt) oder IP-Adressen als nicht personenidentifizierbare Informationen
                        ansieht. Im Rahmen der DSGVO können diese Daten allerdings als personenbezogene Daten gelten. Google AdSense sendet nach jeder
                        Impression (das ist immer dann der Fall, wenn Sie eine Anzeige sehen), jedem Klick und jeder anderen Aktivität, die zu einem
                        Aufruf der Google AdSense-Server führt, ein Cookie an den Browser. Sofern der Browser das Cookie akzeptiert, wird es dort
                        gespeichert.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Drittanbieter können im Rahmen von AdSense unter Umständen Cookies in Ihrem Browser platzieren und auslesen bzw. Web-Beacons
                        verwenden, um Daten zu speichern, die sie durch die Anzeigenbereitstellung auf der Webseite erhalten. Web Beacons sind kleine
                        Grafiken, die eine Logdatei-Aufzeichnung und eine Logdatei-Analyse ermöglichen. Diese Analyse ermöglicht eine statistische
                        Auswertung für das Online-Marketing.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google kann über diese Cookies bestimmte Informationen über Ihr Userverhalten auf unserer Webseite sammeln. Dazu zählen:
                    </Typography>
                    <br />
                    <Typography>
                        <ul>
                            <li>Informationen wie Sie mit einer Anzeige umgehen (Klicks, Impression, Mausbewegungen)</li>
                            <li>
                                Informationen, ob in Ihrem Browser schon eine Anzeige zu einem früheren Zeitpunkt erschienen ist. Diese Daten helfen
                                dabei, Ihnen eine Anzeige nicht öfter anzuzeigen.
                            </li>
                        </ul>
                    </Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Dabei analysiert Google die Daten zu den angezeigten Werbemitteln und Ihre IP-Adresse und wertet diese aus. Google verwendet
                        die Daten in erster Linie, um die Effektivität einer Anzeige zu messen und das Werbeangebot zu verbessern. Diese Daten werden
                        nicht mit personenbezogenen Daten, die Google möglicherweise über andere Google-Dienste von Ihnen hat, verknüpft.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Im Folgenden stellen wir Ihnen Cookies vor, die Google AdSense für Trackingzwecke verwendet. Hierbei beziehen wir uns auf eine
                        Test-Webseite, die ausschließlich Google AdSense installiert hat:
                        <b> </b>
                    </Typography>
                    <br />
                    <Typography>
                        <ul>
                            <li>
                                <b>Name:</b> uid
                            </li>
                            <li>
                                <b>Ablaufzeit:</b> nach 2 Monaten
                            </li>
                            <li>
                                <b>Verwendung:</b> Das Cookie wird unter der Domain adform.net gespeichert. Es stellt eine eindeutig zugewiesene,
                                maschinell generierte User-ID bereit und sammelt Daten über die Aktivität auf unserer Webseite.
                            </li>
                            <li>
                                <b>Beispielwert:</b> 891269189311160982
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <b>Name:</b> C
                            </li>
                            <li>
                                <b>Ablaufzeit:</b> nach 1 Monat
                            </li>
                            <li>
                                <b>Verwendung:</b> Dieses Cookie identifiziert, ob Ihrer Browser Cookies akzeptiert. Das Cookie wird unter der Domain
                                track.adform.net gespeichert.
                            </li>
                            <li>
                                <b>Beispielwert:</b> 1
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <b>Name:</b> cid
                            </li>
                            <li>
                                <b>Ablaufzeit:</b> nach 2 Monaten
                            </li>
                            <li>
                                <b>Verwendung:</b> Dieses Cookie wird unter der Domain track.adform.net gespeichert, steht für Client-ID und wird
                                verwendet, um die Werbung für Sie zu verbessern. Es kann relevantere Werbung an den Besucher weiterleiten und hilft,
                                die Berichte über die Kampagnenleistung zu verbessern.
                            </li>
                            <li>
                                <b>Beispielwert:</b> 8912691894970695056,0,0,0,0
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <b>Name:</b> IDE
                            </li>
                            <li>
                                <b>Ablaufzeit:</b> nach 1 Monat
                            </li>
                            <li>
                                <b>Verwendung:</b> Das Cookie wird unter der Domain doubkeklick.net gespeichert. Es dient dazu, Ihre Aktionen nach der
                                Anzeige bzw. nach dem Klicken der Anzeige zu registrieren. Dadurch kann man messen, wie gut eine Anzeige bei unseren
                                Besuchern ankommt.
                            </li>
                            <li>
                                <b>Beispielwert:</b> zOtj4TWxwbFDjaATZ2TzNaQmxrU311160982
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <b>Name:</b> test_cookie
                            </li>
                            <li>
                                <b>Ablaufzeit:</b> nach 1 Monat
                            </li>
                            <li>
                                <b>Verwendung:</b> Mithilfe des „test_cookies“ kann man überprüfen, ob Ihr Browser überhaupt Cookies unterstützt. Das
                                Cookie wird unter der Domain doubkeklick.net gespeichert.
                            </li>
                            <li>
                                <b>Beispielwert:</b> keine Angabe
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <b>Name:</b> CT592996
                            </li>
                            <li>
                                <b>Ablaufzeit:</b> nach einer Stunde
                            </li>
                            <li>
                                <b>Verwendung:</b> Wird unter der Domain adform.net gespeichert. Das Cookie wird gesetzt sobald Sie auf eine
                                Werbeanzeige klicken. Genauere Informationen über die Verwendung dieses Cookies konnten wir nicht in Erfahrung
                                bringen.
                            </li>
                            <li>
                                <b>Beispielwert</b>: 733366
                            </li>
                        </ul>
                    </Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Anmerkung: Diese Aufzählung kann keinen Anspruch auf Vollständigkeit erheben, da Google erfahrungsgemäß die Wahl ihrer Cookies
                        immer wieder auch verändert.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie lange und wo werden die Daten gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google erfasst Ihre IP-Adresse und verschiedene Aktivitäten, die Sie auf der Webseite ausführen. Cookies speichern diese
                        Informationen zu den Interaktionen auf unsere Webseite. Laut Google sammelt und speichert das Unternehmen die angegebenen
                        Informationen auf sichere Weise auf den hauseigenen Google-Servern in den USA.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wenn Sie kein Google-Konto haben bzw. nicht angemeldet sind, speichert Google die erhobenen Daten mit einer eindeutigen
                        Kennung (ID) meist auf Ihrem Browser. Die in Cookies gespeicherten eindeutigen IDs dienen beispielsweise dazu, personalisierte
                        Werbung zu gewährleisten. Wenn Sie in einem Google-Konto angemeldet sind, kann Google auch personenbezogene Daten erheben.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Einige der Daten, die Google speichert, können Sie jederzeit wieder löschen (siehe nächsten Abschnitt). Viele Informationen,
                        die in Cookies gespeichert sind, werden automatisch nach einer bestimmten Zeit wieder gelöscht. Es gibt allerdings auch Daten,
                        die von Google über einen längeren Zeitraum gespeichert werden. Dies ist dann der Fall, wenn Google aus wirtschaftlichen oder
                        rechtlichen Notwendigkeiten, gewisse Daten über einen unbestimmten, längeren Zeitraum speichern muss.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Sie haben immer die Möglichkeit Cookies, die sich auf Ihrem Computer befinden, zu löschen oder zu deaktivieren. Wie genau das
                        funktioniert hängt von Ihrem Browser ab.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Hier finden Sie die Anleitung, wie Sie Cookies in Ihrem Browser verwalten:
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link href="https://support.google.com/chrome/answer/95647?tid=311160982" target="_blank" rel="noopener">
                            Chrome: Cookies in Chrome löschen, aktivieren und verwalten
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link href="https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=311160982" target="_blank" rel="noopener">
                            Safari: Verwalten von Cookies und Websitedaten mit Safari
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf Ihrem Computer abgelegt haben
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Internet Explorer: Löschen und Verwalten von Cookies
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Microsoft Edge: Löschen und Verwalten von Cookies
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Falls Sie grundsätzlich keine Cookies haben wollen, können Sie Ihren Browser so einrichten, dass er Sie immer informiert, wenn
                        ein Cookie gesetzt werden soll. So können Sie bei jedem einzelnen Cookie entscheiden, ob Sie das Cookie erlauben oder nicht.
                        Durch das Herunterladen und Installieren dieses Browser-Plug-ins auf{' '}
                        <Link href="https://support.google.com/ads/answer/7395996" target="_blank" rel="noopener">
                            https://support.google.com/ads/answer/7395996
                        </Link>{' '}
                        werden ebenfalls alle „Werbecookies“ deaktiviert. Bedenken Sie, dass Sie durch das Deaktivieren dieser Cookies nicht die
                        Werbeanzeigen verhindern, sondern nur die personalisierte Werbung.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wenn Sie ein Google Konto besitzen, können Sie auf der Webseite{' '}
                        <Link href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener">
                            https://adssettings.google.com/authenticated
                        </Link>{' '}
                        personalisierte Werbung deaktivieren. Auch hier sehen Sie dann weiter Anzeigen, allerdings sind diese nicht mehr an Ihre
                        Interessen angepasst. Dennoch werden die Anzeigen auf der Grundlage von ein paar Faktoren wie Ihrem Standort (wird aus Ihrer
                        IP-Adresse abgeleitet), dem Browsertyp und der verwendeten Suchbegriffe angezeigt.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Welche Daten Google grundsätzlich erfasst und wofür sie diese Daten verwenden, können Sie auf{' '}
                        <Link href="https://www.google.com/intl/de/policies/privacy/" target="_blank" rel="noopener">
                            https://www.google.com/intl/de/policies/privacy/
                        </Link>{' '}
                        nachlesen.
                    </Typography>
                    <br />
                    <Typography variant="h6">Google Ads (Google AdWords) Conversion-Tracking Datenschutzerklärung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir verwenden als Online-Marketing-Maßnahme Google Ads (früher Google AdWords), um unsere Produkte, Angebote und
                        Dienstleistungen zu bewerben. So wollen wir im Internet mehr Menschen auf die hohe Qualität unserer Angebote aufmerksam
                        machen. Im Rahmen unserer Werbe-Maßnahmen durch Google Ads verwenden wir auf unserer Website das Conversion-Tracking der
                        Google LLC., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA (&#8220;Google&#8221;). Mithilfe dieses kostenlosen
                        Tracking-Tools können wir unser Werbeangebot an Ihre Interessen und Bedürfnisse deutlich besser anpassen. Im Folgenden Artikel
                        wollen wir genauer darauf eingehen, warum wir Conversion-Tracking benutzen, welche Daten dabei gespeichert werden und wie Sie
                        diese Datenspeicherung verhindern können.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Rechtsgrundlage für die Verwendung von Google Ads Conversion-Tracking ist Artikel 6 (1) f (Rechtmäßigkeit der Verarbeitung),
                        denn es besteht ein berechtigtes Interesse gezielte Werbemaßnahmen durchzuführen.
                    </Typography>
                    <br />
                    <Typography variant="h5">Was ist Google Ads Conversion-Tracking?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Google Ads (früher Google AdWords) ist das hauseigene Online-Werbesystem der Firma Google LLC. Wir können über Google Ads
                        Online-Anzeigen erstellen, um interessierten Menschen unsere Produkte oder Dienstleistungen näher zu bringen. Wir sind von der
                        Qualität unseres Angebots überzeugt und wollen, dass so viele Menschen wie möglich unsere Webseite kennenlernen. Im
                        Onlinebereich bietet Google Ads dafür die beste Plattform. Natürlich wollen wir auch einen genauen Überblick über den
                        Kosten-Nutzen-Faktor unsere Werbeaktionen gewinnen. Darum verwenden wir das Conversion-Tracking-Tool von Google Ads.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Doch was ist eine Conversion eigentlich? Eine Conversion entsteht, wenn Sie von einem rein interessierten Websitebesucher zu
                        einem handelnden Besucher werden. Dies passiert immer dann, wenn Sie auf unsere Anzeige klicken und im Anschluss eine andere
                        Aktion ausführen, wie zum Beispiel unsere Website besuchen. Mit dem Conversion-Tracking-Tool von Google erfassen wir, was nach
                        einem Klick eines Users auf unsere Google Ads-Anzeige geschieht. Zum Beispiel können wir so sehen, ob Produkte gekauft werden,
                        Dienstleistungen in Anspruch genommen werden oder ob sich User für unseren Newsletter angemeldet haben.
                    </Typography>
                    <br />
                    <Typography variant="h5">Warum verwenden wir Google Ads Conversion-Tracking auf unserer Website?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir setzen Google Ads ein, um auch auf anderen Webseiten auf unser Angebot aufmerksam zu machen. Ziel ist es, dass unsere
                        Werbekampagnen wirklich auch nur jene Menschen erreichen, die sich für unsere Produkte und Angebote interessieren. Mit dem
                        Conversion-Tracking Tool sehen wir welche Keywords, Anzeigen, Anzeigengruppen und Kampagnen zu den gewünschten Kundenaktionen
                        führen. Wir sehen, wie viele Kunden mit unseren Anzeigen auf einem Gerät oder in einem Browser interagieren und dann eine
                        Conversion durchführen. Durch diese Daten können wir unseren Kosten-Nutzen-Faktor berechnen, den Erfolg einzelner
                        Werbemaßnahmen messen und folglich unsere Online-Marketing-Maßnahmen optimieren. Wir können weiters mithilfe der gewonnenen
                        Daten unsere Website für Sie interessanter gestalten und unser Werbeangebot noch individueller auf Ihre Bedürfnisse anpassen.
                    </Typography>
                    <br />
                    <Typography variant="h5">Welche Daten werden bei Google Ads Conversion-Tracking gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir haben ein Conversion-Tracking-Tag oder Code-Snippet auf unserer Website eingebunden, um gewisse User-Aktionen besser
                        analysieren zu können. Wenn Sie nun eine unserer Google Ads-Anzeigen anklicken, wird auf Ihrem Computer (meist im Browser)
                        oder Mobilgerät das Cookie „Conversion“ von einer Google-Domain gespeichert. Cookies sind kleine Textdateien, die
                        Informationen auf Ihrem Computer speichern.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Hier die Daten der wichtigsten Cookies für das Conversion-Tracking von Google:
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <b>Name:</b> Conversion
                        <br />
                        <b>Ablaufzeit:</b> nach 3 Monaten
                        <br />
                        <b>Beispielwert:</b>
                        EhMI_aySuoyv4gIVled3Ch0llweVGAEgt-mr6aXd7dYlSAGQ311160982
                        <Typography style={{ textAlign: 'justify' }}>
                            <b>Name:</b> _gac
                            <br />
                            <b>Ablaufzeit:</b> nach 3 Monaten
                            <br />
                            <b>Beispielwert:</b>
                            1.1558695989.EAIaIQobChMIiOmEgYO04gIVj5AYCh2CBAPrEAAYASAAEgIYQfD_BwE
                        </Typography>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Anmerkung: Das Cookie _gac scheint nur in Verbindung mit Google Analytics auf. Die oben angeführte Aufzählung hat keinen
                        Anspruch auf Vollständigkeit, da Google für analytische Auswertung immer wieder auch andere Cookies verwendet.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Sobald Sie eine Aktion auf unserer Website abschließen, erkennt Google das Cookie und speichert Ihre Handlung als sogenannte
                        Conversion. Solange Sie auf unserer Website surfen und das Cookie noch nicht abgelaufen ist, erkennen wir und Google, dass Sie
                        über unsere Google-Ads-Anzeige zu uns gefunden haben. Das Cookie wird ausgelesen und mit den Conversion-Daten zurück an Google
                        Ads gesendet. Es ist auch möglich, dass noch andere Cookies zur Messung von Conversions verwendet werden. Das
                        Conversion-Tracking von Google Ads kann mithilfe von Google Analytics noch verfeinert und verbessert werden. Bei Anzeigen, die
                        Google an verschiedenen Orten im Web anzeigt, werden unter unserer Domain möglicherweise Cookies mit dem Namen
                        &#8220;__gads&#8221; oder “_gac” gesetzt. Seit September 2017 werden diverse Kampagneninformationen von analytics.js mit dem
                        _gac-Cookie gespeichert. Das Cookie speichert diese Daten, sobald Sie eine unserer Seiten aufrufen, für die die automatische
                        Tag-Kennzeichnung von Google Ads eingerichtet wurde. Im Gegensatz zu Cookies, die für Google-Domains gesetzt werden, kann
                        Google diese Conversion-Cookies nur lesen, wenn Sie sich auf unserer Website befinden. Wir erheben und erhalten keine
                        personenbezogenen Daten. Wir bekommen von Google einen Bericht mit statistischen Auswertungen. So erfahren wir beispielsweise
                        die Gesamtanzahl der User, die unsere Anzeige angeklickt haben und wir sehen, wie gut welche Werbemaßnahme angekommen ist.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie lange und wo werden die Daten gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        An dieser Stelle wollen wir darauf hinweisen, dass wir keinen Einfluss darauf haben, wie Google die, durch das
                        Conversion-Tracking-Tool, erhobenen Daten weiterverwendet. Laut Google werden die Daten verschlüsselt und auf sicheren Servern
                        gespeichert. In den meisten Fällen laufen Conversion-Cookies nach 30 Tagen ab und übermitteln keine personenbezogenen Daten.
                        Die Cookies mit dem Namen „Conversion“ und „_gac“ (das in Verbindung mit Google Analytics zum Einsatz kommt) haben ein
                        Ablaufdatum von 3 Monaten.
                    </Typography>
                    <br />
                    <Typography variant="h5">Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Sie haben die Möglichkeit am Conversion-Tracking von Google Ads nicht teilzunehmen. Wenn Sie das Cookie des Google
                        Conversion-Tracking über Ihren Browser deaktivieren, blockieren Sie das Conversion-Tracking. In diesem Fall werden Sie in der
                        Statistik des Tracking-Tools nicht berücksichtigt. Sie können die Cookie-Einstellungen in Ihrem Browser jederzeit verändern.
                        Bei jedem Browser funktioniert dies etwas anders. Hier finden Sie die Anleitung, wie Sie Cookies in Ihrem Browser verwalten:
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link href="https://support.google.com/chrome/answer/95647?tid=311160982" target="_blank" rel="noopener">
                            Chrome: Cookies in Chrome löschen, aktivieren und verwalten
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link href="https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=311160982" target="_blank" rel="noopener">
                            Safari: Verwalten von Cookies und Websitedaten mit Safari
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf Ihrem Computer abgelegt haben
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Internet Explorer: Löschen und Verwalten von Cookies
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        <Link
                            href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=311160982"
                            target="_blank"
                            rel="noopener"
                        >
                            Microsoft Edge: Löschen und Verwalten von Cookies
                        </Link>
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Falls Sie grundsätzlich keine Cookies haben wollen, können Sie Ihren Browser so einrichten, dass er Sie immer informiert, wenn
                        ein Cookie gesetzt werden soll. So können Sie bei jedem einzelnen Cookie entscheiden, ob Sie das Cookie erlauben oder nicht.
                        Durch das Herunterladen und Installieren dieses Browser-Plug-ins auf{' '}
                        <Link href="https://support.google.com/ads/answer/7395996" target="_blank" rel="noopener">
                            https://support.google.com/ads/answer/7395996
                        </Link>{' '}
                        werden ebenfalls alle „Werbecookies“ deaktiviert. Bedenken Sie, dass Sie durch das Deaktivieren dieser Cookies nicht die
                        Werbeanzeigen verhindern, sondern nur die personalisierte Werbung.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Durch die Zertifizierung für das amerikanische-europäische Datenschutzübereinkommen &#8220;Privacy Shield&#8221;, muss der
                        amerikanische Konzern Google LLC die in der EU geltenden Datenschutzgesetze einhalten. Wenn Sie Näheres über den Datenschutz
                        bei Google erfahren möchten, empfehlen wir die allgemeine Datenschutzerklärung von Google:{' '}
                        <Link href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener">
                            https://policies.google.com/privacy?hl=de
                        </Link>
                        .
                    </Typography>
                    <br />
                    <Typography variant="h6">Facebook Datenschutzerklärung</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir verwenden auf unserer Webseite ausgewählte Facebook Tools von Facebook. Facebook ist ein Social Media Network des
                        Unternehmens Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2 Ireland. Mithilfe dieser Tools können
                        wir Ihnen und Menschen, die sich für unsere Produkte und Dienstleistungen interessieren, das bestmögliche Angebot bieten. Im
                        Folgenden geben wir einen Überblick über die verschiedenen Facebook Tools, welche Daten an Facebook gesendet werden und wie
                        Sie diese Daten löschen können.
                    </Typography>
                    <br />
                    <Typography variant="h5">Was sind Facebook-Tools?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Neben vielen anderen Produkten bietet Facebook auch die sogenannten &#8220;Facebook Business Tools&#8221; an. Das ist die
                        offizielle Bezeichnung von Facebook. Da der Begriff aber kaum bekannt ist, haben wir uns dafür entschieden, sie lediglich
                        Facebook-Tools zu nennen. Darunter finden sich unter anderem:
                    </Typography>
                    <br />
                    <Typography>
                        <ul>
                            <li>Facebook-Pixel</li>
                            <li>soziale Plug-ins (wie z.B der „Gefällt mir“- oder „Teilen“-Button)</li>
                            <li>Facebook Login</li>
                            <li>Account Kit</li>
                            <li>APIs (Programmierschnittstelle)</li>
                            <li>SDKs (Sammlung von Programmierwerkzeugen)</li>
                            <li>Plattform-Integrationen</li>
                            <li>Plugins</li>
                            <li>Codes</li>
                            <li>Spezifikationen</li>
                            <li>Dokumentationen</li>
                            <li>Technologien und Dienstleistungen</li>
                        </ul>
                    </Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Durch diese Tools erweitert Facebook Dienstleistungen und hat die Möglichkeit, Informationen über User-Aktivitäten außerhalb
                        von Facebook zu erhalten.
                    </Typography>
                    <br />
                    <Typography variant="h5">Warum verwenden wir Facebook-Tools auf unserer Webseite?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Wir wollen unsere Dienstleistungen und Produkte nur Menschen zeigen, die sich auch wirklich dafür interessieren. Mithilfe von
                        Werbeanzeigen (Facebook-Ads) können wir genau diese Menschen erreichen. Damit den Usern passende Werbung gezeigt werden kann,
                        benötigt Facebook allerdings Informationen über die Wünsche und Bedürfnisse der Menschen. So werden dem Unternehmen
                        Informationen über das Userverhalten (und Kontaktdaten) auf unserer Webseite zur Verfügung gestellt. Dadurch sammelt Facebook
                        bessere User-Daten und kann interessierten Menschen die passende Werbung über unsere Produkte bzw. Dienstleistungen anzeigen.
                        Die Tools ermöglichen somit maßgeschneiderte Werbekampagnen auf Facebook.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Daten über Ihr Verhalten auf unserer Webseite nennt Facebook „Event-Daten“. Diese werden auch für Messungs- und Analysedienste
                        verwendet. Facebook kann so in unserem Auftrag „Kampagnenberichte“ über die Wirkung unserer Werbekampagnen erstellen. Weiters
                        bekommen wir durch Analysen einen besseren Einblick, wie Sie unsere Dienstleistungen, Webseite oder Produkte verwenden.
                        Dadurch optimieren wir mit einigen dieser Tools Ihre Nutzererfahrung auf unserer Webseite. Beispielsweise können Sie mit den
                        sozialen Plug-ins Inhalte auf unserer Seite direkt auf Facebook teilen.
                    </Typography>
                    <br />
                    <Typography variant="h5">Welche Daten werden von Facebook-Tools gespeichert?</Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Durch die Nutzung einzelner Facebook-Tools können personenbezogene Daten (Kundendaten) an Facebook gesendet werden. Abhängig
                        von den benutzten Tools können Kundendaten wie Name, Adresse, Telefonnummer und IP-Adresse versandt werden.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Facebook verwendet diese Informationen, um die Daten mit den ihren eigenen Daten, die es von Ihnen hat (sofern Sie
                        Facebook-Mitglied sind) abzugleichen. Bevor Kundendaten an Facebook übermittelt werden, erfolgt ein sogenanntes „Hashing“. Das
                        bedeutet, dass ein beliebig großer Datensatz in eine Zeichenkette transformiert wird. Dies dient auch der Verschlüsselung von
                        Daten.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Neben den Kontaktdaten werden auch „Event-Daten“ übermittelt. Unter „Event-Daten“ sind jene Informationen gemeint, die wir
                        über Sie auf unserer Webseite erhalten. Zum Beispiel, welche Unterseiten Sie besuchen oder welche Produkte Sie bei uns kaufen.
                        Facebook teilt die erhaltenen Informationen nicht mit Drittanbietern (wie beispielsweise Werbetreibende), außer das
                        Unternehmen hat eine explizite Genehmigung oder ist rechtlich dazu verpflichtet. „Event-Daten“ können auch mit Kontaktdaten
                        verbunden werden. Dadurch kann Facebook bessere personalisierte Werbung anbieten. Nach dem bereits erwähnten
                        Abgleichungsprozess löscht Facebook die Kontaktdaten wieder.
                    </Typography>
                    <br />
                    <Typography style={{ textAlign: 'justify' }}>
                        Um Werbeanzeigen optimiert ausliefern zu können, verwendet Facebook die Event-Daten nur, wenn diese mit anderen Daten (die auf
                        andere Weise von Facebook erfasst wurden) zusammengefasst wurden. Diese Event-Daten nützt Facebook auch für Sicherheits-,
                        Schutz-, Entwicklungs- und Forschungszwecken. Viele dieser Daten werden über Cookies zu Facebook übertragen. Cookies sind
                        kleine Text-Dateien, die zum Speichern von Daten bzw. Informationen in Browsern verwendet werden. Je nach verwendeten Tools
                        und abhängig, ob Sie Facebook-Mitglied sind, werden unterschiedlich viele Cookies in Ihrem Browser angelegt. In den
                        Beschreibungen der einzelnen Facebook Tools gehen wir näher auf einzelne Facebook-Cookies ein. Allgemeine Informationen über
                        die Verwendung von Facebook-Cookies erfahren Sie auch auf{' '}
                        <Link href="https://www.facebook.com/policies/cookies?tid=311160982" target="_blank" rel="noopener">
                            https://www.facebook.com/policies/cookies
                        </Link>
                        .
                        <br />
                        <Typography variant="h5">Wie lange und wo werden die Daten gespeichert?</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Grundsätzlich speichert Facebook Daten bis sie nicht mehr für die eigenen Dienste und Facebook-Produkte benötigt werden.
                            Facebook hat auf der ganzen Welt Server verteilt, wo Ihre Daten gespeichert werden. Kundendaten werden allerdings, nachdem
                            sie mit den eigenen Userdaten abgeglichen wurden, innerhalb von 48 Stunden gelöscht.
                        </Typography>
                        <br />
                        <Typography variant="h5">Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Entsprechend der Datenschutz Grundverordnung haben Sie das Recht auf Auskunft, Berichtigung, Übertragbarkeit und Löschung
                            Ihrer Daten.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Eine komplette Löschung der Daten erfolgt nur, wenn Sie Ihr Facebook-Konto vollständig löschen. Und so funktioniert das
                            Löschen Ihres Facebook-Kontos:
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>1) Klicken Sie rechts bei Facebook auf Einstellungen.</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            2) Anschließend klicken Sie in der linken Spalte auf „Deine Facebook-Informationen“.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>3) Nun klicken Sie &#8220;Deaktivierung und Löschung&#8221;.</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            4) Wählen Sie jetzt „Konto löschen“ und klicken Sie dann auf „Weiter und Konto löschen“
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            5) Geben Sie nun Ihr Passwort ein, klicken Sie auf „Weiter“ und dann auf „Konto löschen“
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Die Speicherung der Daten, die Facebook über unsere Seite erhält, erfolgt unter anderem über Cookies (z.B. bei sozialen
                            Plugins). In Ihrem Browser können Sie einzelne oder alle Cookies deaktivieren, löschen oder verwalten. Je nach dem welchen
                            Browser Sie verwenden, funktioniert dies auf unterschiedliche Art und Weise. Die folgenden Anleitungen zeigen, wie Sie
                            Cookies in Ihrem Browser verwalten:
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <Link href="https://support.google.com/chrome/answer/95647?tid=311160982" target="_blank" rel="noopener">
                                Chrome: Cookies in Chrome löschen, aktivieren und verwalten
                            </Link>
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <Link href="https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=311160982" target="_blank" rel="noopener">
                                Safari: Verwalten von Cookies und Websitedaten mit Safari
                            </Link>
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <Link
                                href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=311160982"
                                target="_blank"
                                rel="noopener"
                            >
                                Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf Ihrem Computer abgelegt haben
                            </Link>
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <Link
                                href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=311160982"
                                target="_blank"
                                rel="noopener"
                            >
                                Internet Explorer: Löschen und Verwalten von Cookies
                            </Link>
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <Link
                                href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=311160982"
                                target="_blank"
                                rel="noopener"
                            >
                                Microsoft Edge: Löschen und Verwalten von Cookies
                            </Link>
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Falls Sie grundsätzlich keine Cookies haben wollen, können Sie Ihren Browser so einrichten, dass er Sie immer informiert,
                            wenn ein Cookie gesetzt werden soll. So können Sie bei jedem einzelnen Cookie entscheiden, ob Sie es erlauben oder nicht.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Facebook ist aktiver Teilnehmer beim EU-U.S. Privacy Shield Framework, wodurch der korrekte und sichere Datentransfer
                            persönlicher Daten geregelt wird. Mehr Informationen dazu finden Sie auf{' '}
                            <Link href="https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC" target="_blank" rel="follow noopener">
                                https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC
                            </Link>
                            . Wir hoffen wir haben Ihnen die wichtigsten Informationen über die Nutzung und Datenverarbeitung durch die Facebook-Tools
                            nähergebracht. Wenn Sie mehr darüber erfahren wollen, wie Facebook Ihre Daten verwendet, empfehlen wir Ihnen die
                            Datenrichtlinien auf{' '}
                            <Link href="https://www.facebook.com/about/privacy/update" target="_blank" rel="noopener">
                                https://www.facebook.com/about/privacy/update
                            </Link>
                            .
                        </Typography>
                        <br />
                        <Typography variant="h6">Instagram Datenschutzerklärung</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Wir haben auf unserer Webseite Funktionen von Instagram eingebaut. Instagram ist eine Social Media Plattform des
                            Unternehmens Instagram LLC, 1601 Willow Rd, Menlo Park CA 94025, USA. Instagram ist seit 2012 ein Tochterunternehmen von
                            Facebook Inc. und gehört zu den Facebook-Produkten. Das Einbetten von Instagram-Inhalten auf unserer Webseite nennt man
                            Embedding. Dadurch können wir Ihnen Inhalte wie Buttons, Fotos oder Videos von Instagram direkt auf unserer Webseite
                            zeigen. Wenn Sie Webseiten unserer Webpräsenz aufrufen, die eine Instagram-Funktion integriert haben, werden Daten an
                            Instagram übermittelt, gespeichert und verarbeitet. Instagram verwendet dieselben Systeme und Technologien wie Facebook.
                            Ihre Daten werden somit über alle Facebook-Firmen hinweg verarbeitet.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Im Folgenden wollen wir Ihnen einen genaueren Einblick geben, warum Instagram Daten sammelt, um welche Daten es sich
                            handelt und wie Sie die Datenverarbeitung weitgehend kontrollieren können. Da Instagram zu Facebook Inc. gehört, beziehen
                            wir unsere Informationen einerseits von den Instagram-Richtlinien, andererseits allerdings auch von den
                            Facebook-Datenrichtlinien selbst.
                        </Typography>
                        <br />
                        <Typography variant="h5">Was ist Instagram?</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Instagram ist eines der bekanntesten Social Media Netzwerken weltweit. Instagram kombiniert die Vorteile eines Blogs mit
                            den Vorteilen von audiovisuellen Plattformen wie YouTube oder Vimeo. Sie können auf „Insta“ (wie viele der User die
                            Plattform salopp nennen) Fotos und kurze Videos hochladen, mit verschiedenen Filtern bearbeiten und auch in anderen
                            sozialen Netzwerken verbreiten. Und wenn Sie selbst nicht aktiv sein wollen, können Sie auch nur anderen interessante
                            Users folgen.
                        </Typography>
                        <br />
                        <Typography variant="h5">Warum verwenden wir Instagram auf unserer Webseite?</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Instagram ist jene Social Media Plattform, die in den letzten Jahren so richtig durch die Decke ging. Und natürlich haben
                            auch wir auf diesen Boom reagiert. Wir wollen, dass Sie sich auf unserer Webseite so wohl wie möglich fühlen. Darum ist
                            für uns eine abwechslungsreiche Aufbereitung unserer Inhalte selbstverständlich. Durch die eingebetteten
                            Instagram-Funktionen können wir unseren Content mit hilfreichen, lustigen oder spannenden Inhalten aus der Instagram-Welt
                            bereichern. Da Instagram eine Tochtergesellschaft von Facebook ist, können uns die erhobenen Daten auch für
                            personalisierte Werbung auf Facebook dienlich sein. So bekommen unsere Werbeanzeigen nur Menschen, die sich wirklich für
                            unsere Produkte oder Dienstleistungen interessieren.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Instagram nützt die gesammelten Daten auch zu Messungs- und Analysezwecken. Wir bekommen zusammengefasste Statistiken und
                            so mehr Einblick über Ihre Wünsche und Interessen. Wichtig ist zu erwähnen, dass diese Berichte Sie nicht persönlich
                            identifizieren.
                        </Typography>
                        <br />
                        <Typography variant="h5">Welche Daten werden von Instagram gespeichert?</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Wenn Sie auf eine unserer Seiten stoßen, die Instagram-Funktionen (wie Instagrambilder oder Plug-ins) eingebaut haben,
                            setzt sich Ihr Browser automatisch mit den Servern von Instagram in Verbindung. Dabei werden Daten an Instagram versandt,
                            gespeichert und verarbeitet. Und zwar unabhängig, ob Sie ein Instagram-Konto haben oder nicht. Dazu zählen Informationen
                            über unserer Webseite, über Ihren Computer, über getätigte Käufe, über Werbeanzeigen, die Sie sehen und wie Sie unser
                            Angebot nutzen. Weiters werden auch Datum und Uhrzeit Ihrer Interaktion mit Instagram gespeichert. Wenn Sie ein
                            Instagram-Konto haben bzw. eingeloggt sind, speichert Instagram deutlich mehr Daten über Sie.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Facebook unterscheidet zwischen Kundendaten und Eventdaten. Wir gehen davon aus, dass dies bei Instagram genau so der Fall
                            ist. Kundendaten sind zum Beispiel Name, Adresse, Telefonnummer und IP-Adresse. Wichtig zu erwähnen ist, dass diese
                            Kundendaten erst an Instagram übermittelt werden, wenn Sie zuvor „gehasht“ wurden. Hashing meint, ein Datensatz wird in
                            eine Zeichenkette verwandelt. Dadurch kann man die Kontaktdaten verschlüsseln. Zudem werden auch die oben genannten
                            „Event-Daten“ übermittelt. Unter „Event-Daten“ versteht Facebook – und folglich auch Instagram – Daten über Ihr
                            Userverhalten. Es kann auch vorkommen, dass Kontaktdaten mit Event-Daten kombiniert werden. Die erhobenen Kontaktdaten
                            werden mit den Daten, die Instagram bereits von Ihnen hat abgeglichen.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Über kleine Text-Dateien (Cookies), die meist in Ihrem Browser gesetzt werden, werden die gesammelten Daten an Facebook
                            übermittelt. Je nach verwendeten Instagram-Funktionen und ob Sie selbst ein Instagram-Konto haben, werden unterschiedlich
                            viele Daten gespeichert.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Wir gehen davon aus, dass bei Instagram die Datenverarbeitung gleich funktioniert wie bei Facebook. Das bedeutet: wenn Sie
                            ein Instagram-Konto haben oder{' '}
                            <Link href="http://www.instagram.com?tid=311160982" target="_blank" rel="noopener">
                                www.instagram.com
                            </Link>{' '}
                            besucht haben, hat Instagram zumindest ein Cookie gesetzt. Wenn das der Fall ist, sendet Ihr Browser über das Cookie Infos
                            an Instagram, sobald Sie mit einer Instagram-Funktion in Berührung kommen. Spätestens nach 90 Tagen (nach Abgleichung)
                            werden diese Daten wieder gelöscht bzw. anonymisiert. Obwohl wir uns intensiv mit der Datenverarbeitung von Instagram
                            beschäftigt haben, können wir nicht ganz genau sagen, welche Daten Instagram exakt sammelt und speichert.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Im Folgenden zeigen wir Ihnen Cookies, die in Ihrem Browser mindestens gesetzt werden, wenn Sie auf eine
                            Instagram-Funktion (wie z.B. Button oder ein Insta-Bild) klicken. Bei unserem Test gehen wir davon aus, dass Sie kein
                            Instagram-Konto haben. Wenn Sie bei Instagram eingeloggt sind, werden natürlich deutlich mehr Cookies in Ihrem Browser
                            gesetzt.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>Diese Cookies wurden bei unserem Test verwendet:</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <b>Name: </b>csrftoken
                            <br />
                            <b>Wert: </b>&#8220;&#8221;
                            <br />
                            <b>Verwendungszweck: </b>
                            Dieses Cookie wird mit hoher Wahrscheinlichkeit aus Sicherheitsgründen gesetzt, um Fälschungen von Anfragen zu verhindern.
                            Genauer konnten wir das allerdings nicht in Erfahrung bringen.
                            <br />
                            <b>Ablaufdatum:</b> nach einem Jahr
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <b>Name: </b>mid
                            <br />
                            <b>Wert: </b>&#8220;&#8221;
                            <br />
                            <b>Verwendungszweck: </b>
                            Instagram setzt dieses Cookie, um die eigenen Dienstleistungen und Angebote in und außerhalb von Instagram zu optimieren.
                            Das Cookie legt eine eindeutige User-ID fest.
                            <br />
                            <b>Ablaufdatum:</b> nach Ende der Sitzung
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <b>Name:</b> fbsr_311160982124024
                            <br />
                            <b>Wert: </b>keine Angaben
                            <br />
                            <b>Verwendungszweck: </b>
                            Dieses Cookie speichert die Log-in-Anfrage für User der Instagram-App.
                            <b>
                                <br />
                            </b>
                            <b>Ablaufdatum:</b> nach Ende der Sitzung
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <b>Name:</b> rur
                            <br />
                            <b>Wert: </b>ATN
                            <br />
                            <b>Verwendungszweck: </b>
                            Dabei handelt es sich um ein Instagram-Cookie, das die Funktionalität auf Instagram gewährleistet.
                            <br />
                            <b>Ablaufdatum:</b> nach Ende der Sitzung
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <b>Name:</b> urlgen
                            <br />
                            <b>Wert: </b>
                            &#8220;\&#8221;194.96.75.33\&#8221;: 1901:1iEtYv:Y833k2_UjKvXgYe311160982&#8221;
                            <br />
                            <b>Verwendungszweck: </b>
                            Dieses Cookie dient den Marketingzwecken von Instagram.
                            <br />
                            <b>Ablaufdatum:</b> nach Ende der Sitzung
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <b>Anmerkung:</b> Wir können hier keinen Vollständigkeitsanspruch erheben. Welche Cookies im individuellen Fall gesetzt
                            werden, hängt von den eingebetteten Funktionen und Ihrer Verwendung von Instagram ab.
                        </Typography>
                        <br />
                        <Typography variant="h5">Wie lange und wo werden die Daten gespeichert?</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Instagram teilt die erhaltenen Informationen zwischen den Facebook-Unternehmen mit externen Partnern und mit Personen, mit
                            denen Sie sich weltweit verbinden. Die Datenverarbeitung erfolgt unter Einhaltung der eigenen Datenrichtlinie. Ihre Daten
                            sind, unter anderem aus Sicherheitsgründen, auf den Facebook-Servern auf der ganzen Welt verteilt. Die meisten dieser
                            Server stehen in den USA.
                        </Typography>
                        <br />
                        <Typography variant="h5">Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Dank der Datenschutz Grundverordnung haben Sie das Recht auf Auskunft, Übertragbarkeit, Berichtigung und Löschung Ihrer
                            Daten. In den Instagram-Einstellungen können Sie Ihre Daten verwalten. Wenn Sie Ihre Daten auf Instagram völlig löschen
                            wollen, müssen Sie Ihr Instagram-Konto dauerhaft löschen.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>Und so funktioniert die Löschung des Instagram-Kontos:</Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Öffnen Sie zuerst die Instagram-App. Auf Ihrer Profilseite gehen Sie nach unten und klicken Sie auf „Hilfebereich“. Jetzt
                            kommen Sie auf die Webseite des Unternehmens. Klicken Sie auf der Webseite auf „Verwalten des Kontos“ und dann auf „Dein
                            Konto löschen“.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Wenn Sie Ihr Konto ganz löschen, löscht Instagram Posts wie beispielsweise Ihre Fotos und Status-Updates. Informationen,
                            die andere Personen über Sie geteilt haben, gehören nicht zu Ihrem Konto und werden folglich nicht gelöscht.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Wie bereits oben erwähnt, speichert Instagram Ihre Daten in erster Linie über Cookies. Diese Cookies können Sie in Ihrem
                            Browser verwalten, deaktivieren oder löschen. Abhängig von Ihrem Browser funktioniert die Verwaltung immer ein bisschen
                            anders. Hier zeigen wir Ihnen die Anleitungen der wichtigsten Browser.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <Link href="https://support.google.com/chrome/answer/95647?tid=311160982" target="_blank" rel="noopener">
                                Chrome: Cookies in Chrome löschen, aktivieren und verwalten
                            </Link>
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <Link href="https://support.apple.com/de-at/guide/safari/sfri11471/mac?tid=311160982" target="_blank" rel="noopener">
                                Safari: Verwalten von Cookies und Websitedaten mit Safari
                            </Link>
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <Link
                                href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen?tid=311160982"
                                target="_blank"
                                rel="noopener"
                            >
                                Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf Ihrem Computer abgelegt haben
                            </Link>
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <Link
                                href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies?tid=311160982"
                                target="_blank"
                                rel="noopener"
                            >
                                Internet Explorer: Löschen und Verwalten von Cookies
                            </Link>
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            <Link
                                href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies?tid=311160982"
                                target="_blank"
                                rel="noopener"
                            >
                                Microsoft Edge: Löschen und Verwalten von Cookies
                            </Link>
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Sie können auch grundsätzlich Ihren Browser so einrichten, dass Sie immer informiert werden, wenn ein Cookie gesetzt
                            werden soll. Dann können Sie immer individuell entscheiden, ob Sie das Cookie zulassen wollen oder nicht.
                        </Typography>
                        <br />
                        <Typography style={{ textAlign: 'justify' }}>
                            Instagram ist ein Tochterunternehmen von Facebook Inc. und Facebook ist aktiver Teilnehmer beim EU-U.S. Privacy Shield
                            Framework. Dieses Framework stellt eine korrekte Datenübertragung zwischen den USA und der Europäischen Union sicher.
                            Unter
                            <Link href="https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC" target="_blank" rel="noopener">
                                https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC
                            </Link>
                            erfahren Sie mehr darüber. Wir haben versucht, Ihnen die wichtigsten Informationen über die Datenverarbeitung durch
                            Instagram näherzubringen. Auf{' '}
                            <Link href="https://help.instagram.com/519522125107875" target="_blank" rel="noopener">
                                https://help.instagram.com/519522125107875
                            </Link>{' '}
                            können Sie sich noch näher mit den Datenrichtlinien von Instagram auseinandersetzen.
                        </Typography>
                        <br />
                    </Typography>
                    <br />
                </div>
            </Paper>
            <Footer />
        </>
    );
});

export default DataProtectionPolicyPage;
