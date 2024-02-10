export const generateNumberArray = (lengthOfArray:number, startIndex = 0) =>{
    return Array.from(
        {length: lengthOfArray},
        (_, i) => i + startIndex,
      );
}