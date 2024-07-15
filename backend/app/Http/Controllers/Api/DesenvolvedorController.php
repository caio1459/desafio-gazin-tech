<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\CustomRequestException;
use App\Http\Controllers\Controller;
use App\Http\Requests\DesenvolvedorRequest;
use App\Http\Requests\PaginationRequest;
use App\Http\Resources\DesenvolvedorResource;
use App\Models\Desenvolvedor;
use App\Services\DesenvolvedorService;
use App\Services\PaginationService;
use App\Services\ResponseService;
use OpenApi\Annotations as OA;

class DesenvolvedorController extends Controller
{
    protected $desenvolvedorService;
    protected $responseService;
    protected $paginationService;

    public function __construct(
        DesenvolvedorService $desenvolvedorService,
        ResponseService $responseService,
        PaginationService $paginationService
    ) {
        $this->desenvolvedorService = $desenvolvedorService;
        $this->responseService = $responseService;
        $this->paginationService = $paginationService;
    }

    /**
     * @OA\Get(
     *     path="/api/desenvolvedores",
     *     summary="Lista todos os desenvolvedores",
     *     description="Retorna uma lista paginada de desenvolvedores",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Número da página",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="itens",
     *         in="query",
     *         description="Número de itens por página",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="sort",
     *         in="query",
     *         description="Campo que vai ser ordenado",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="order",
     *         in="query",
     *         description="Ordenação crescente (asc) ou descrescente (desc)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="id",
     *         in="query",
     *         description="Filtra pelo id do desenvolvedor",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="nome",
     *         in="query",
     *         description="Filtra pelo nome do desenvolvedor",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="hobby",
     *         in="query",
     *         description="Filtra pelo hobby do desenvolvedor",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="sexo",
     *         in="query",
     *         description="Filtra pelo sexo do desenvolvedor",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="nivel_id",
     *         in="query",
     *         description="Filtra pelo nivel do desenvolvedor",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de desenvolvedores",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Desenvolvedor")
     *             ),
     *             @OA\Property(
     *                 property="meta",
     *                 type="object",
     *                 @OA\Property(
     *                     property="total",
     *                     type="integer",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="per_page",
     *                     type="integer",
     *                     example=2
     *                 ),
     *                 @OA\Property(
     *                     property="current_page",
     *                     type="integer",
     *                     example=1
     *                 ),
     *                 @OA\Property(
     *                     property="last_page",
     *                     type="integer",
     *                     example=1
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Requisição inválida"
     *     )
     * )
     */
    public function index(PaginationRequest $request)
    {
        $query = Desenvolvedor::with('nivel');
        $camposFiltrados = ['id', 'nome', 'hobby', 'sexo', 'nivel_id'];

        try {
            $result = $this->paginationService->paginate($request, $query, $camposFiltrados);
            return response()->json([
                'data' => DesenvolvedorResource::collection(collect($result['data'])),
                'meta' => $result['meta'],
            ]);
        } catch (CustomRequestException $e) {
            return $e->render();
        }
    }

    /**
     * @OA\Post(
     *     path="/api/desenvolvedores",
     *     summary="Cria um novo desenvolvedor",
     *     description="Cria um novo desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Desenvolvedor")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Desenvolvedor criado",
     *         @OA\JsonContent(ref="#/components/schemas/Desenvolvedor")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Requisição inválida"
     *     )
     * )
     */
    public function store(DesenvolvedorRequest $request)
    {
        $data = $request->validated();
        $dev = Desenvolvedor::create($data);
        $dev->load('nivel');
        return new DesenvolvedorResource($dev);
    }

    /**
     * @OA\Put(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Atualiza um desenvolvedor existente",
     *     description="Atualiza os dados de um desenvolvedor existente",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID do desenvolvedor",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Desenvolvedor")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Desenvolvedor atualizado",
     *         @OA\JsonContent(ref="#/components/schemas/Desenvolvedor")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Desenvolvedor não encontrado"
     *     )
     * )
     */
    public function update(DesenvolvedorRequest $request, string $id)
    {
        try {
            $dev = $this->desenvolvedorService->verificarDev($id);
            $data = $request->validated();
            $dev->update($data);
            $dev->load('nivel');
            return new DesenvolvedorResource($dev);
        } catch (CustomRequestException $e) {
            return $e->render();
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Exclui um desenvolvedor",
     *     description="Exclui um desenvolvedor existente",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID do desenvolvedor",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Desenvolvedor excluído com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Desenvolvedor não encontrado"
     *     )
     * )
     */
    public function destroy(string $id)
    {
        try {
            $dev = $this->desenvolvedorService->verificarDev($id);
            $dev->delete();
            return $this->responseService->sendSuccess('', '', 204);
        } catch (CustomRequestException $e) {
            return $e->render();
        }
    }
}
