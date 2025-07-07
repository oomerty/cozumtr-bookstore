interface dateFormatType {
  date: Date;
  type: "dd/mm/yyyy-hr/mn" | "dd/mm/yyyy";
}

export default function dateFormat({ date, type }: dateFormatType) {
  let day,
    month,
    year,
    hour,
    minute = undefined;

  if (type === "dd/mm/yyyy-hr/mn" || type === "dd/mm/yyyy") {
    day = date.getDay() < 10 ? `0${date.getDay() - 1}` : date.getDay() - 1;
    month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    year = date.getFullYear();
  }

  if (type === "dd/mm/yyyy-hr/mn") {
    hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    minute =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  }

  if (type === "dd/mm/yyyy-hr/mn")
    return `${day}/${month}/${year} ${hour}:${minute}`;

  if (type === "dd/mm/yyyy") return `${day}/${month}/${year}`;
}
