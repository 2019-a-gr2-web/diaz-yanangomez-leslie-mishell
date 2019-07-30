export interface Pedido {
    pedidoId?: number;
    estadoPedido: 'Activo'|'Por Despachar'|'Despachado';
    totalSinImpuestos?: number;
    totalConImpuestos?: number;
    usuarioId: number;
}
