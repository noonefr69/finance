import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SmileIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// اضافه کردن ID به بخش‌های مختلف صفحه
export default function HelpPage() {
  return (
    <div className="flex gap-4">
      <div className="w-full">
        <h1 className="flex items-center gap-2">
          Simple to use
          <SmileIcon />
        </h1>

        {/* بخش Budgets با ID */}
        <section id="budgets" className="scroll-mt-20">
          <ul>
            <li className="flex flex-col">
              <p className="text-lg">
                1. After you sign in go to budgets to create budget for you
                money.
              </p>
              <Image
                src={`/Budgets.png`}
                alt="Budgets page screenshot"
                width={1000}
                height={1000}
                className="w-full"
              />
              <div className="w-full h-1 bg-accent my-4 rounded border-dotted border-2" />
              <Image
                id="createBudgets"
                src={`/createBudget.png`}
                alt="Create budget screenshot"
                width={1000}
                height={1000}
                className="w-full"
              />
            </li>
          </ul>
        </section>

        {/* بخش Transactions با ID */}
        <section id="transactions" className="scroll-mt-20 mt-8">
          <ul>
            <li className="flex flex-col">
              <p className="text-lg">
                2. Then go to transactions and create your transactions.
              </p>
              <Image
                src={`/goTransaction.png`}
                alt="Go to transactions screenshot"
                width={1000}
                height={1000}
                className="w-full"
              />
              <div className="w-full h-1 bg-accent my-4 rounded border-dotted border-2" />
              <Image
                id="createTransactions"
                src={`/createTransaction.png`}
                alt="Create transaction screenshot"
                width={1000}
                height={1000}
                className="w-full"
              />
            </li>
          </ul>
        </section>

        {/* بخش Pots با ID */}
        <section id="pots" className="scroll-mt-20 mt-10">
          <ul>
            <h1 className="text-2xl">Pots.</h1>
            <p>
              There is a place that you can save your money that you are not
              gonna use now.
            </p>
            <Image
              src={`/PotsBemola.png`}
              alt="Pots feature screenshot"
              width={1000}
              height={1000}
              className="w-full"
            />
          </ul>
        </section>

        {/* بخش Recurring Bills با ID */}
        <section id="recurring-bills" className="scroll-mt-20 mt-10">
          <ul>
            <h1 className="text-2xl">Recurring Bills.</h1>
            <p>Track and manage your recurring bills and subscriptions.</p>
            <Image
              src={`/RecBils.png`}
              alt="Recurring bills screenshot"
              width={1000}
              height={1000}
              className="w-full"
            />
          </ul>
        </section>
      </div>

      <div className="p-0 h-auto bg-transparent md:flex hidden text-[12px] border-0 shadow-none top-[calc(var(--header-height)+1px)] z-30 ml-auto w-(--sidebar-width) flex-col gap-1 pb-8">
        <Card className="text-accent-foreground/80 sticky top-6 border-0 shadow-none bg-transparent p-0 m-0">
          <CardHeader className="p-0">On This Page</CardHeader>
          <CardContent className="p-0 mt-2">
            <nav>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="#budgets"
                    className="w-fit hover:text-white transition-colors duration-200 data-[active=true]:text-white"
                  >
                    Budgets
                  </Link>
                </li>
                <li>
                  <Link
                    href="#createBudgets"
                    className="w-fit ml-4 hover:text-white transition-colors duration-200 data-[active=true]:text-white"
                  >
                    Create budgets
                  </Link>
                </li>
                <li>
                  <Link
                    href="#transactions"
                    className="w-fit hover:text-white transition-colors duration-200 data-[active=true]:text-white"
                  >
                    Transactions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#createTransactions"
                    className="w-fit hover:text-white transition-colors duration-200 data-[active=true]:text-white ml-4"
                  >
                    Create Transactions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pots"
                    className="w-fit hover:text-white transition-colors duration-200 data-[active=true]:text-white"
                  >
                    Pots
                  </Link>
                </li>
                <li>
                  <Link
                    href="#recurring-bills"
                    className="w-fit hover:text-white transition-colors duration-200 data-[active=true]:text-white"
                  >
                    Recurring Bills
                  </Link>
                </li>
              </ul>
            </nav>
          </CardContent>
          <CardFooter className="mt-6 p-0 pt-4 border-t border-accent/20">
            <div className="flex items-center gap-2">
              Give a star on
              <Link
                target="_blank"
                href="https://github.com/noonefr69/finance"
                className="text-primary hover:text-white transition-colors"
              >
                GitHub ★
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
