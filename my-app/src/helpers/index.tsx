function Countries(id: string, countries: any) {
  const flag = countries.filter((item: { id: string }) => item.id === id)[0]
    .code;

  return `https://countryflagsapi.com/png/${flag}`;
}

function Books(
  cardBooks: {
    data: any;
  },
  authors: { id: string; name: string }[],
  books: {
    copiesSold: number;
    authorId: string;
    id: string;
    name: string;
  }[]
) {
  const booksUpdated = books.map((book) => {
    return {
      id: book.id,
      name: book.name,
      copiesSold: book.copiesSold,
      author: authors
        .map((item: { id: any; name: any }) =>
          item.id === book.authorId ? item.name : ''
        )
        .filter((e: string) => e !== '')[0],
    };
  });

  //update card books with booksUpdated data

  const cardBooksUpdated = cardBooks?.data?.map((book: any) => {
    return {
      name: booksUpdated
        .map((item: { id: any; name: any }) =>
          item.id === book.id ? item.name : ''
        )
        .filter((e: string) => e !== '')[0],

      author: booksUpdated
        .map((item: { id: any; author: any }) =>
          item.id === book.id ? item.author : ''
        )
        .filter((e: string) => e !== '')[0],

      copiesSold: booksUpdated
        .map((item: { id: any; copiesSold: any }) =>
          item.id === book.id ? item.copiesSold : ''
        )
        .filter((e: string) => e !== '')[0],
    };
  });

  //select the 2 best sellers

  return cardBooksUpdated
    ?.sort((a: any, b: any) => b.copiesSold - a.copiesSold)
    .slice(0, 2);
}

export { Countries, Books };
