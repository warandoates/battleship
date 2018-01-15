export default function sentenceBuilder(data, activePlayerId) {
    let positiveSlams = [
        "BOO-YA!",
        "WATCH OUT!",
        "BAM!!!",
        "ON TARGET!",
        "GETTING. IT. DONE.",
    ];
    let negativeSlams = [
        "hit nothing but water",
        "regrets that shot",
        "should be ashamed",
        "is slipping",
        "needs to re-evaluate",
    ];
    if (data.contents === 'empty') {
        return `MISS! Player ${activePlayerId} ${negativeSlams[Math.floor(Math.random() * 5)]}!`
    } else {
        return `HIT! Player ${activePlayerId} hit a ${data.contents}.
        ${positiveSlams[Math.floor(Math.random() * 5)]}`
    }
}