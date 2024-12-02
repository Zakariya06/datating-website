import { Paper, Typography } from '@material-ui/core';
import React, { memo } from 'react';

import { AppbarComponent } from '../components/AppbarComponent';
import Footer from '../components/Footer';
import Config from '../../../config';

export interface IAgbPageProps {}

export const AgbPage = memo((props: IAgbPageProps) => {
    return (
        <>
            <AppbarComponent />
            <Paper
                style={{ paddingTop: 100, paddingBottom: 100, wordBreak: 'break-all' }}
                className="flex column align-items-center justify-content-center"
                elevation={0}
            >
                <div className="wrapper">
                    <Typography variant="h4">AGB (Allgemeine Geschäftsbedingungen)</Typography>
                    <br />
                    <Typography variant="h5">Präambel</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Die nachfolgenden Geschäftsbedingungen regeln das Vertragsverhältnis zwischen der {Config.GLOBAL_AGB_ADDR} und den Nutzern und Kunden ihrer Telemediendienste
                        (nachfolgend „Nutzer“). Sie definieren die Bedingungen, unter denen die Nutzung des Diensteangebotes 
                        von {Config.GLOBAL_SITE_NAME} erfolgt.
                    </Typography>
                    <br />
                    <Typography variant="h5">1. Gegenstand des Vertrages und Leistungsumfang</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        {Config.GLOBAL_SITE_NAME} ermöglicht den Nutzern über seine mobile Applikation einen Zugang auf ein zentrales Datenbanksystem. Dieses
                        Datenbanksystem enthält Profile und Informationen über andere Nutzer. Die Nutzer haben nach der Registrierung und Erstellung
                        eines eigenen Profils die Möglichkeit, in der Datenbank nach anderen Profilen zu suchen. Die Nutzer können sich die Profile
                        anderer Nutzer ansehen und mit diesen in Kontakt treten. Darüber hinaus bietet {Config.GLOBAL_SITE_NAME} im Rahmen des Zugangs auf das
                        Datenbanksystem die Möglichkeit, auf Datenmaterial von ausgewählten Nutzern zuzugreifen. Inhalt, Art und Dauer des von dem
                        jeweiligen Nutzer zur Verfügung gestellten und übertragenen Datenmaterials obliegt allein dem Nutzer. Die Dienste von 
                        {Config.GLOBAL_SITE_NAME}
                        werden ausschließlich für private, nicht gewerbliche Zwecke angeboten. Mit der Registrierung verpflichtet sich der Nutzer, den
                        Dienst nur für private Zwecke zu nutzen. {Config.GLOBAL_SITE_NAME} stellt sowohl kostenlose als auch kostenpflichtige Dienstleistungen zur
                        Verfügung. Mit der kostenfreien Registrierung kann der Nutzer ein Profil anlegen, die Profile anderer Nutzer einsehen sowie
                        Nachrichten anderer Nutzer lesen. Ebenso kann ein Nutzer kostenfrei die Profile anderer Nutzer markieren. Wenn zwei Nutzer
                        gegenseitig das Profil des jeweils anderen markieren, wird dies beiden Nutzern angezeigt. Dies stellt einen sogenannten Match
                        dar. Nutzer, die sich für den zusätzlichen kostenpflichtigen Dienst anmelden, können zusätzlich zu den kostenlosen Diensten
                        andere Nutzer kontaktieren und ihnen Nachrichten schreiben. Der Nutzer wird vor Bereitstellung dieser Dienste auf die
                        Kostenpflichtigkeit, den Inhalt und den Umfang der Dienste sowie auf den Preis und die Zahlungsbedingungen hingewiesen.
                        {Config.GLOBAL_SITE_NAME} behält sich vor, die Leistungs- und Dienstebeschreibung zu ändern, wenn die Änderung wegen gesetzlicher oder
                        behördlicher Vorgaben erfolgt oder wenn eine Anpassung an den technischen Fortschritt nötig wird, soweit die Änderung nicht
                        deutlich von der ursprünglichen Leistungs- oder Dienstebeschreibung abweicht und der Nutzer dadurch nicht schlechter gestellt
                        wird. {Config.GLOBAL_SITE_NAME} wird dem Nutzer eine derartige Änderung mit einer Frist von zwei Wochen ankündigen. Der Nutzer kann innerhalb
                        dieser Frist den Änderungen widersprechen. Wenn der Nutzer innerhalb dieser Frist den Änderungen nicht widerspricht, gelten
                        die geänderten Leistungs- und Dienstebeschreibungen ab dem Tag des Fristablaufs. {Config.GLOBAL_SITE_NAME} kann sich zum Angebot ihrer
                        Telemediendienste extern beauftragter Dienstleister bedienen. Hierzu zählen insbesondere Payment-Provider, ContentProvider,
                        Newsletterversender und Inkassounternehmen. Beauftragte externe Dienstleister, die im Auftrag von {Config.GLOBAL_SITE_NAME} Leistungen
                        erbringen, gelten nicht als Dritte im Sinne dieser Allgemeinen Geschäftsbedingungen.
                    </Typography>
                    <br />
                    <Typography variant="h5">2. Vertragsabschluss und Zugang</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Nicht volljährige Personen sowie solche, die im Auftrag eines Dritten handeln, sind von der Nutzung der Dienste von {Config.GLOBAL_SITE_NAME}
                        ausgeschlossen. Ergibt sich für {Config.GLOBAL_SITE_NAME} der begründete Verdacht eine Person sei nicht teilnahmeberechtigt, ist {Config.GLOBAL_SITE_NAME}
                        berechtigt die Personalien der Person durch eine Identitätsfeststellung mittels Anforderung amtlicher Papiere zu prüfen. Nicht
                        teilnahmeberechtigte Nutzer werden von der Nutzung der Dienste von {Config.GLOBAL_SITE_NAME} und der Datenbank ausgeschlossen. Der Zugang zur
                        Nutzung der Datenbank und der Dienste von {Config.GLOBAL_SITE_NAME} erfolgt nach der Registrierung des Nutzers. Bei der Registrierung wird ein
                        vom Nutzer vergebenes Passwort und Pseudonym verwendet. Die Registrierung setzt das Eingeben einer E-Mail-Adresse des Nutzers
                        voraus, sowie ein vollständiges Ausfüllen der Registrierungsmaske. Dazu zählen der Geburtstag, das Geschlecht sowie das Setzen
                        eines Profilbildes. Als Alternative wird dem Nutzer eine Connect-Funktion von Drittanbietern (z.B. Facebook-Connect)
                        angeboten. Bei der Anmeldung über die Connect-Funktion eines Drittanbieters werden die jeweiligen Profile des Nutzers in die
                        Datenbank von {Config.GLOBAL_SITE_NAME} übernommen. Bei der Registrierung über die Connect-Funktion eines Drittanbieters muss der Nutzer die
                        jeweiligen Bedingungen der Drittanbieter bestätigen. Mit der Registrierung entsteht ein kostenloses Vertragsverhältnis
                        zwischen {Config.GLOBAL_SITE_NAME} und dem Nutzer.
                    </Typography>
                    <br />
                    <Typography variant="h5">3. Kostenpflichtige Dienste / Coins</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        {Config.GLOBAL_SITE_NAME} bietet dem Nutzer neben den kostenlosen Diensten verschiedene kostenpflichtige Dienste und Leistungen an. Mit
                        Inanspruchnahme dieser Dienste geht der Nutzer ein weiteres, von dem kostenlosen Vertragsverhältnis getrenntes
                        Vertragsverhältnis ein. Grundlage dieses weiteren Vertragsverhältnisses sind ebenfalls diese Allgemeinen Geschäftsbedingungen.
                        Der Vertrag wird dadurch geschlossen, dass der Nutzer die kostenpflichtige Leistung auswählt und durch das Betätigen des
                        „Kaufen“-Buttons die Zahlungsverpflichtung akzeptiert (nachfolgend: Bestellprozess). Durch den Abschluss des kostenpflichtigen
                        Vertragsverhältnisses erhält der Nutzer einen im Bestellprozess ausgewählten Betrag in Form eines Guthabenkontos
                        gutgeschrieben. Das Guthaben wird in sogenannten Coins geführt. Gegen einen Verbrauch von 10 Coins kann der Nutzer Nachrichten
                        an andere Nutzer versenden. Weist das Guthabenkonto keine Coins mehr auf, ist das Versenden einer weiteren Nachricht an andere
                        Nutzer nicht möglich. Durch den Bestellprozess kann der Nutzer seinem Guthabenkonto erneut Coins hinzufügen. Alle
                        kostenpflichtigen Aktionen in der Übersicht: – Zwinker: 10 Coins – Profilbesucher aufdecken: 10 Coins – Geschenk versenden: 30
                        – 500 Coins – Nachricht versenden: 10 Coins – Bildfreischaltungen: 01 – 1000 Coins
                    </Typography>
                    <br />
                    <Typography variant="h5">4. Zahlungsbedingungen</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Das Entgelt für kostenpflichtige Dienste ist im Voraus an {Config.GLOBAL_SITE_NAME} zu entrichten und wird über das im Bestellprozess gewählte
                        Zahlungsverfahren in voller Höhe eingezogen. {Config.GLOBAL_SITE_NAME} kann die Zahlung für kostenpflichtige Dienste über einen von {Config.GLOBAL_SITE_NAME}
                        beauftragten externen Dienstleister abwickeln lassen.
                    </Typography>
                    <br />
                    <Typography variant="h5">5. Abmeldung, Kündigung und Laufzeit</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Ein Nutzer ist jederzeit berechtigt, sein Profil ohne Angabe von Gründen per EMail an info@{Config.GLOBAL_SITE_NAME}.de löschen zu lassen.
                        Dadurch wird auch der Vertrag über die kostenpflichtigen Dienste beendet. In diesem Fall ist eine Erstattung der Kosten von
                        nicht verbrauchten Coins grundsätzlich auf Nachfrage möglich. Hierbei werden allerdings die selben Prozente abgezogen die an
                        verschiedene Bezahldienste für den Betreiber anfallen. Verstößt der Nutzer gegen die vorliegenden Allgemeinen
                        Geschäftsbedingungen ist die Mitgliedschaft durch {Config.GLOBAL_SITE_NAME} ohne Einhaltung einer Kündigungsfrist jederzeit außerordentlich
                        kündbar. Darüber hinaus behält sich {Config.GLOBAL_SITE_NAME} jederzeit das Recht vor, die Registrierung eines Nutzers ohne Angabe von Gründen
                        abzulehnen. Mit Beendigung des Vertrages enden sämtliche Pflichten des Betreibers Daten des Nutzers zu speichern, soweit nicht
                        gesetzliche Aufbewahrungsfristen eine Speicherung erfordern.
                    </Typography>
                    <br />
                    <Typography variant="h5">6. Nutzer Pflichten Für den Inhalt seiner Registrierung</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Die weiteren Angaben über seine Person und damit für die Informationen, die er über sich bereitstellt, ist der Nutzer allein
                        verantwortlich. Der Nutzer versichert, dass die angegebenen Daten der Wahrheit entsprechen und ihn persönlich beschreiben.
                        Vorsätzliche oder in betrügerischer Absicht gemachte Falschangaben können zivil- und strafrechtliche Schritte nach sich ziehen
                        und berechtigen {Config.GLOBAL_SITE_NAME} zur Sperrung des Nutzerprofils, ohne das hiervon der Vergütungsanspruch von {Config.GLOBAL_SITE_NAME} 
                        betroffen wird.
                        Der Nutzer versichert, dass er die Dienste von {Config.GLOBAL_SITE_NAME} nicht zu geschäftlichen oder kommerziellen Zwecken, insbesondere
                        Werbezwecken, nutzt. Es ist dem Nutzer nicht erlaubt, Inhalte und Profile anderer Nutzer manuell oder durch den Einsatz von
                        Computerprogrammen auszulesen, um die so gewonnenen Daten zu nutzen. Der Nutzer verpflichtet sich, seine Zugangsdaten
                        vertraulich zu behandeln. Für den Fall der Weitergabe der Zugangsdaten an Dritte ist der Nutzer für alle Folgen der Handlung
                        verantwortlich. Besteht der Verdacht dass die Zugangsdaten an Dritte weitergeleitet wurden, hat der Nutzer {Config.GLOBAL_SITE_NAME}
                        unverzüglich hierüber zu informieren und selbst geeignete Maßnahmen zur Vermeidung eines weiteren Missbrauchs zu treffen
                        (beispielsweise indem der Nutzer das Passwort ändert). Ferner verpflichtet sich der Nutzer, die Dienstleistungen von {Config.GLOBAL_SITE_NAME}
                        nicht missbräuchlich zu nutzen, insbesondere, diese nicht zu nutzen, um diffamierendes, rassistisches, volksverhetzendes oder
                        in sonstiger Weise rechtswidriges Material oder solche Informationen zu verbreiten; illegale Pornografie über das
                        Datenbanksystem oder von anderen Nutzern nachzufragen; diese nicht zu nutzen, um andere Nutzer oder Darsteller zu bedrohen, zu
                        belästigen oder deren Rechte (einschließlich Persönlichkeitsrechte) zu verletzen; keine Daten in das System oder die Datenbank
                        einzubringen, die einen Virus enthalten oder die Software oder anderes Material enthalten, das urheberrechtlich oder durch
                        sonstige Schutzrechte geschützt ist, es sei denn, der Nutzer ist Inhaber der jeweiligen Rechte oder besitzt die erforderliche
                        Zustimmung zur Nutzung; diese nicht in einer Art und Weise zu nutzen, welche die Verfügbarkeit der Dienste für andere Nutzer
                        negativ beeinflusst; keine E-Mails oder sonstige Nachrichten abzufangen und dieses auch nicht zu versuchen; keine Kettenbriefe
                        zu versenden; keine E-Mails oder andere Nachrichten, die einem gewerblichen oder kommerziellen Zweck dienen, zu versenden; in
                        den Profildaten keine Namen, Adressen, Telefon- oder Faxnummern, Messengeradressen, Emails oder URLs zu nennen; keine
                        persönlichen Daten über andere Nutzer oder Darsteller zu sammeln, zu speichern oder zu verarbeiten. Eine Nichtbeachtung der
                        obigen Verhaltenspflichten oder ein Verstoß gegen sonstige in diesen AGB geregelte Pflichten berechtigt Matchlu zur sofortigen
                        Sperrung des Zugangs des Nutzers zur Datenbank sowie zu einer fristlosen Kündigung des Vertrages aus wichtigem Grund.
                        Weitergehende Schadensersatzansprüche bleiben hiervon unberührt. Der Nutzer ist weiterhin verpflichtet die
                        Foto/Bilder-Richtlinie von {Config.GLOBAL_SITE_NAME} zu befolgen.
                    </Typography>
                    <br />
                    <Typography variant="h5">7. Kommunikation</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        {Config.GLOBAL_SITE_NAME} richtet für den Nutzer ein elektronisches Postfach unter seinem Profil ein. Dieses dient dem Kontakt mit anderen
                        Nutzern und der Übermittlung von Servicemitteilungen von Matchlu. Weitere Mitteilungen von Matchlu an den Nutzer erfolgen über
                        die von ihm angegebene E-Mail-Adresse. Den Nutzern der Datenbank von {Config.GLOBAL_SITE_NAME} wird ein Chat zur Verfügung gestellt, der dem
                        gegenseitigen Austausch von Informationen in textlicher Form, sowie von Geschenken und Zwinkern zur Kontaktaufnahme dient. Die
                        Nutzer sind selbst dafür verantwortlich die Kommunikation untereinander zu gestalten und auf eine adäquate Ausdrucksweise zu
                        achten. Zu unterlassen sind sexuell anrüchige Ansprachen zu Beginn und Andeutungen während der Kommunikation. Ein Chat kann
                        durch den Nutzer jederzeit gestartet werden. Hierbei können Nutzer, die über eine vordefinierte Anzahl an Coins verfügen,
                        andere Nutzer kostenpflichtig anschreiben. Ein Nutzer erhält voreingestellt Push-Benachrichtigungen. Die Benachrichtigungen
                        umfassen Hinweise auf erhaltene Chat-Nachrichten, Besuche des Profils durch andere Nutzer, Markierungen des Profils durch
                        andere Nutzer und Matches. Die Benachrichtigungen können in den Einstellungen der App (iOS) und in den Android-Einstellungen
                        (Android) abgestellt werden. {Config.GLOBAL_SITE_NAME} setzt zur Unterhaltung der Nutzer professionelle Animateure und Operatoren ein, die im
                        System nicht gesondert gekennzeichnet werden. Diese Dienstleistung wird in höchster Qualität betrieben. Es sind mit diesen
                        Operatoren keine realen Treffen möglich. Die Nutzer können ihnen lediglich Nachrichten innerhalb des Portals senden.
                    </Typography>
                    <br />
                    <Typography variant="h5">8. Werbung und Newsletter</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Mit der Registrierung bei {Config.GLOBAL_SITE_NAME} stimmt der Nutzer ausdrücklich und lediglich zu, dass ihm Nachrichten mit Informationen zu
                        {Config.GLOBAL_SITE_NAME} zugesendet werden welche für die Nutzung relevant sind. Newsletter sowie Informationen zu anderen Nutzern und
                        Angeboten dürfen erst bei Bestätigung der Newsletter zugesendet werden. Der Nutzer ist jederzeit berechtigt den Versand der
                        beiden Benachrichtigungen zu stoppen.
                    </Typography>
                    <br />
                    <Typography variant="h5">9. Haftung von {Config.GLOBAL_SITE_NAME}</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        {Config.GLOBAL_SITE_NAME} übernimmt keine Verantwortung und Gewähr für die Richtigkeit und Sicherheit der von anderen Nutzern veröffentlichten
                        oder übermittelten Daten und Inhalte. Ebenso übernimmt {Config.GLOBAL_SITE_NAME} keine Haftung für die Richtigkeit der Inhalte der der
                        Nutzerprofile. Obwohl dies nicht gestattet ist, können Nutzer unrichtige oder rechtswidrige Informationen und Inhalte eingeben
                        oder die Dienste von {Config.GLOBAL_SITE_NAME} für zu unzulässigen oder rechtswidrigen Zwecken nutzen. {Config.GLOBAL_SITE_NAME} stellt mit dem Zugang zur
                        Datenbank eine IT-Dienstleistung zur Verfügung und schuldet keinen Erfolg. Da {Config.GLOBAL_SITE_NAME} außerhalb der eigenen IT-Infrastruktur
                        keinerlei Einfluss auf den Transport von Daten über das Internet hat, sowie aufgrund der Eigenarten und Unsicherheiten des
                        Internet kann {Config.GLOBAL_SITE_NAME} keine Haftung für solch externe Datenverluste und/oder Fehler im Bereich der Datenübertragung
                        übernehmen. {Config.GLOBAL_SITE_NAME} haftet nicht für Ausfälle des Angebotes, welche außerhalb des eigenen Einflussbereichs begründet liegen
                        (z.B. wegen höherer Gewalt oder technischer Störungen des Internets). {Config.GLOBAL_SITE_NAME} übernimmt keine Haftung für den Missbrauch von
                        Informationen die der Nutzer selbst Dritten zur Verfügung gestellt hat. Ebenso haftet {Config.GLOBAL_SITE_NAME} nicht für die unbefugte
                        Kenntniserlangung Dritter von persönlichen Daten der Nutzer (beispielsweise durch einen unbefugten Zugriff auf die zentrale
                        Datenbank), es sei denn {Config.GLOBAL_SITE_NAME} hat die unbefugte Kenntniserlangung durch Dritte vorsätzlich oder grob fahrlässig möglich
                        gemacht. {Config.GLOBAL_SITE_NAME} haftet – außer bei Verletzung wesentlicher Vertragspflichten, bei Verletzung von Leben, Körper oder
                        Gesundheit oder bei Ansprüchen aus dem Produkthaftungsgesetz – nur für Vorsatz und grobe Fahrlässigkeit. Wesentliche
                        Vertragspflichten sind solche, deren Erfüllung zur Erreichung des Vertragszweckes notwendig ist. Bei leicht fahrlässiger
                        Verletzung einer Pflicht, die wesentlich für die Erreichung des Vertragszwecks ist (Kardinalpflicht), ist die Haftung von
                        {Config.GLOBAL_SITE_NAME} der Höhe nach begrenzt auf den Schaden, der nach der Art des fraglichen Geschäftes vorhersehbar und typisch ist. Die
                        vorstehende Haftungsbeschränkung gilt auch für die persönliche Haftung der Mitarbeiter, Vertreter und Organe von {Config.GLOBAL_SITE_NAME}.
                    </Typography>
                    <br />
                    <Typography variant="h5">10. Rechte</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Der Nutzer räumt {Config.GLOBAL_SITE_NAME} an den von ihm auf der Datenbank erstellten oder eingestellten Inhalten, einschließlich Bildern,
                        Texten und Videos, ein nicht ausschließliches, übertragbares und zeitlich auf die Vertragslaufzeit beschränktes einfaches
                        Nutzungsrecht ein. Der Nutzer versichert, dass die von ihm eingestellten oder erstellten Inhalte und deren Nutzung keine
                        Rechte Dritter, insbesondere keine Urheber- oder sonstige Schutzrechte, verletzen.
                    </Typography>
                    <br />
                    <Typography variant="h5">11. Freistellung</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Der Nutzer stellt {Config.GLOBAL_SITE_NAME}, 
                        im Rahmen der gesetzlichen Bestimmungen, von einer Haftung und von allen weiteren Verpflichtungen,
                        Ansprüchen und Aufwendungen, die sich aus von ihm zu vertretenden Handlungen und Schäden wegen Beleidigung, übler Nachrede,
                        Verletzung von Immaterialgüter-, Persönlichkeits- oder sonstigen Rechten Dritter und wegen des Ausfalls von Dienstleistungen
                        für andere Nutzer, frei.
                    </Typography>
                    <br />
                    <Typography variant="h5">12. Änderung der Allgemeinen Geschäftsbedingungen</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        {Config.GLOBAL_SITE_NAME} behält sich das Recht vor, diese AGB jederzeit zu ändern, soweit hierdurch wesentliche Regelungen des
                        Vertragsverhältnisses nicht berührt werden und dies zur Anpassung an Entwicklungen erforderlich ist, welche bei
                        Vertragsschluss für {Config.GLOBAL_SITE_NAME} nicht vorhersehbar waren und deren Nichtberücksichtigung die Ausgewogenheit des
                        Vertragsverhältnisses merklich stören würde. Wesentliche Regelungen sind insbesondere solche über Art und Umfang der
                        vereinbarten Leistungen sowie die Laufzeit einschließlich der Regelungen zur Kündigung. {Config.GLOBAL_SITE_NAME} ist berechtigt Veränderungen
                        vorzunehmen um Vertragslücken zu schließen, die insbesondere durch gesetzliche Änderungen und Änderungen in der Rechtsprechung
                        auftreten. {Config.GLOBAL_SITE_NAME} wird den Nutzer unter Zusendung der zu ändernden AGB per E-Mail oder Push-Benachrichtigung auf die
                        Änderungen hinweisen. Der Nutzer hat die Möglichkeit mit einer Frist von zwei Wochen den Änderungen zu widersprechen. Wenn der
                        Nutzer innerhalb dieser Frist den Änderungen nicht widerspricht, gelten die geänderten AGB ab dem Tag des Fristablaufs.
                    </Typography>
                    <br />
                    <Typography variant="h5">13. Datenschutz</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        {Config.GLOBAL_SITE_NAME} erhebt, verarbeitet und nutzt personenbezogene Daten des Nutzers wie in diesen Bedingungen und in der
                        Datenschutzerklärung beschrieben. Die Speicherung personenbezogener Daten richtet sich nach den gesetzlichen Vorgaben.
                    </Typography>
                    <br />
                    <Typography variant="h5">14. Schlussbestimmungen</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Die zwischen Matchlu und dem Nutzer bestehenden Rechtsverhältnisse unterliegen vorbehaltlich zwingender Vorschriften dem Recht
                        der Bundesrepublik Deutschland. Der Gerichtsstand für alle Ansprüche aus diesem Vertrag ist Berlin, soweit der Nutzer kein
                        Verbraucher ist. Die Anwendbarkeit zwingender Vorschriften des Staates, in dem der Nutzer bei Abschluss des Vertrages seinen
                        gewöhnlichen Aufenthalt oder Wohnort hat, bleibt unberührt. Sollten einzelne Bestimmungen dieser Allgemeinen
                        Geschäftsbedingungen ungültig oder unvollständig sein, bleiben die übrigen Allgemeinen Geschäftsbedingungen in ihrer
                        Gültigkeit unberührt.
                    </Typography>
                    <br />
                    <Typography variant="h5">15. Widerrufsbelehrung Widerrufsrecht</Typography>
                    <Typography style={{ textAlign: 'justify' }}>
                        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt
                        vierzehn Tage ab dem Tag des Vertragsschluss. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns ({Config.GLOBAL_AGB_ADDR}, info@{Config.GLOBAL_SITE_NAME}.de) mittels einer eindeutigen Erklärung
                        (z.B. ein mit der Post versandter Brief oder EMail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Zur
                        Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
                        Widerrufsfrist absenden. Folgen des Widerrufs Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von
                        Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie
                        eine andere Art der Lieferung als die von uns angebotene, günstige Standardlieferung gewählt haben), unverzüglich und
                        spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrages bei uns
                        eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
                        eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
                        Rückzahlung Entgelte berechnet. Haben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so haben
                        Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des
                        Widerrufsrechts hinsichtlich dieses Vertrages unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang
                        der im Vertrag vorgesehenen Dienstleistungen entspricht. Muster-Widerrufsformular (Wenn Sie den Vertrag widerrufen wollen,
                        dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.) An {Config.GLOBAL_AGB_ADDR} E-Mail info@{Config.GLOBAL_SITE_NAME}.de hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
                        Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*) Bestellt am (*)/erhalten am (*)
                        Name des/der Verbraucher(s) Anschrift des/der Verbraucher(s) Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf
                        Papier) Datum (*) Unzutreffendes streichen. Soweit der Nutzer seine ausdrückliche Zustimmung erteilt hat, erlischt das
                        Widerrufsrecht vorzeitig wenn die durch den Nutzer gewünschte Dienstleistung von {Config.GLOBAL_SITE_NAME} vollständig erbracht wurde, bevor
                        dieser sein Widerrufsrecht ausgeübt hat.
                    </Typography>
                </div>
            </Paper>
            <Footer />
        </>
    );
});

export default AgbPage;
