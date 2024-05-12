import Link from "next/link";
import { getSummaries } from "@/lib/services/summariesloader";
import { Search } from "@/components/Search/Search";
import { PaginationComponent } from "@/components/pagination/Pagination";





function LinkCard({ id, title, summary }) {
  return (
    <Link href={`/dashboard/summaries/${id}`} className="border border-red-400 p-2 rounded-md">
      <div className="relative">
        <div>
          <p className="leading-8 text-pink-500">
            {title || "Video Summary"}
          </p>
        </div>
        <div>
          <p className="w-full mb-4 leading-7">
            {summary.slice(0, 164) + " [read more]"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default async function SummariesRoute({searchParams}) {
  const query = searchParams.query

  const currentPage = searchParams.page
  const { data,meta } = await getSummaries(query,currentPage);
  const pageCount = meta.pagination.pageCount
  if (!data) return null;
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search/>
      <p>Query : {query} </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <LinkCard key={item.id} {...item} />
        ))}
      </div>
      <PaginationComponent  pageCount={pageCount}/>
    </div>
  );
}