export default function sentenceBuilder(data, activePlayerId) {
    let positiveSlams = [
        "BOO-YA!",
        "WATCH OUT!",
        "Now we're cooking with gas!!!",
        "They could hear it the cheap seats!",
        "That's how you GET. IT. DONE.",
    ];
    let negativeSlams = [
        "hit nothing but water",
        "couldn't hit fish in a barrel",
        "wishes they could take that one back",
        "is slipping!",
        "needs to go back to the drawing board",
    ];
    if (data.contents === 'empty') {
        return `MISS! Player ${activePlayerId} ${negativeSlams[Math.floor(Math.random() * 5)]}!`
    } else {
        return `HIT! Player ${activePlayerId} hit a ${data.contents}.
        ${positiveSlams[Math.floor(Math.random() * 5)]}`
    }
}