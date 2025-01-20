-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recorte" (
    "id" SERIAL NOT NULL,
    "nomeModelo" TEXT NOT NULL,
    "ordemExibicao" INTEGER NOT NULL,
    "sku" TEXT NOT NULL,
    "tipoRecorte" TEXT NOT NULL,
    "posicaoRecorte" TEXT NOT NULL,
    "tipoProduto" TEXT NOT NULL,
    "materialRecorte" TEXT NOT NULL,
    "corMaterial" TEXT NOT NULL,
    "linkImagem" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recorte_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recorte_sku_key" ON "Recorte"("sku");
