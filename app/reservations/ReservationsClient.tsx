"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { Reservation, User } from "@prisma/client";

interface ReservationsClientProps {
  reservations: Reservation[];
  currentUser?: User | null;
}

function ReservationsClient({
  reservations,
  currentUser,
}: ReservationsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Rezervasyon iptal edildi");
          router.refresh();
        })
        .catch(() => {
          toast.error("Birşeyler ters gitti");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Rezervasyonlar" subtitle="Evinizdeki rezervasyonlar" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation:any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Misafirin rezervasyonunu iptal et"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default ReservationsClient;
