const removeEmojiAsync = async (message, emojiId) => {
    let reactions = await message.reactions;

    for (const reaction of reactions) {
        if (!reaction[0].includes(emojiId)) continue;
        reaction[1].remove();
    }
}

exports.removeEmojiAsync = removeEmojiAsync;