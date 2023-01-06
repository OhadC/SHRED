// this funciton is written by openAI chatbot, and it's more efficient than the original one (Damerau-Levenshtein [O(n+m)] instead of Levenshtein [O(n*m)]).

export function getStringsSimilarity(s1: string, s2: string): number {
    const longer = s1.length >= s2.length ? s1 : s2;
    const distance = damerauLevenshteinDistance(s1, s2);

    return (longer.length - distance) / longer.length;
}

function damerauLevenshteinDistance(s1: string, s2: string): number {
    // Convert the strings to lowercase for case-insensitivity.
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    // Create an array to store the edit distances.
    const distances: number[][] = [];

    // Initialize the array with the distances between each character of the two strings.
    for (let i = 0; i <= s1.length; i++) {
        distances[i] = [i];
    }
    for (let j = 0; j <= s2.length; j++) {
        distances[0][j] = j;
    }

    // Loop through the string characters and calculate the distances.
    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            distances[i][j] = Math.min(distances[i - 1][j] + 1, distances[i][j - 1] + 1, distances[i - 1][j - 1] + cost);
            if (i > 1 && j > 1 && s1[i - 1] === s2[j - 2] && s1[i - 2] === s2[j - 1]) {
                distances[i][j] = Math.min(distances[i][j], distances[i - 2][j - 2] + cost);
            }
        }
    }

    // Return the edit distance between the two strings.
    return distances[s1.length][s2.length];
}
